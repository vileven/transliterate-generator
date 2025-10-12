const { default: transliterateGenerator, maps } = require('../dist');

const buildTransliterator = (map, limit) => transliterateGenerator(map, limit);

describe('transliterateGenerator README interface', () => {
  test('exports default generator function and maps helper', () => {
    expect(typeof transliterateGenerator).toBe('function');

    const transliterate = buildTransliterator(maps.cyrillicToLatin, Infinity);
    expect(typeof transliterate).toBe('function');
    expect(transliterate('привет')).toEqual(['privjet', 'privyet', 'privet']);
  });

  test('maps expose documented built-in tables', () => {
    expect(Object.keys(maps).sort()).toEqual(['cyrillicToLatin', 'latinToCyrillic']);
    expect(maps.cyrillicToLatin['ё']).toEqual(['jo', 'yo']);
    expect(maps.latinToCyrillic.sch).toEqual(['ш', 'щ']);
  });
});

describe('transliterateGenerator behavior', () => {
  test('produces every permitted transliteration when unlimited', () => {
    const transliterate = buildTransliterator(maps.cyrillicToLatin, Infinity);
    expect(transliterate('ёж')).toEqual(['jozh', 'yozh']);
  });

  test('stops expanding variants once the limit is reached', () => {
    const transliterate = buildTransliterator(maps.latinToCyrillic, 5);
    expect(transliterate('schastie')).toEqual([
      'зкхastie',
      'скхastie',
      'зчastie',
      'счastie',
      'шastie',
      'щastie',
    ]);
  });

  test('default limit disables transliterations', () => {
    const transliterate = buildTransliterator(maps.cyrillicToLatin);
    expect(transliterate('ёж')).toEqual(['ёж']);
  });

  test('limit of zero keeps the input unchanged', () => {
    const transliterate = buildTransliterator(maps.cyrillicToLatin, 0);
    expect(transliterate('щ')).toEqual(['щ']);
  });

  test('custom map supports mixed sequence lengths', () => {
    const map = {
      b: ['b'],
      a: ['a'],
      t: ['t'],
      h: ['h'],
      th: ['θ'],
    };

    const transliterate = buildTransliterator(map, Infinity);
    expect(transliterate('bath')).toEqual(['bath', 'baθ']);
  });
});
