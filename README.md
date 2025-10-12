# transliterate-generator

`transliterate-generator` helps you build deterministic transliteration functions out of simple mapping tables. It ships with ready-made Cyrillic ↔ Latin maps and exposes a generator that can produce every transliteration variant permitted by those maps.

## Installation

```bash
npm install transliterate-generator
```

## Usage

```ts
import transliterateGenerator, { maps } from 'transliterate-generator';

const transliterate = transliterateGenerator(maps.cyrillicToLatin, Infinity);

transliterate('привет');
// [ 'privjet', 'privyet', 'privet' ]
```

> ℹ️ Pass a sufficiently large `maxTranslits` value (for unlimited output use `Infinity`). When the limit is omitted or reached the generator stops expanding new variants and simply appends the original characters.

When several replacements are defined for the same symbol sequence, every combination is produced:

```ts
const transliterate = transliterateGenerator(maps.cyrillicToLatin, Infinity);

transliterate('ёж');
// [ 'jozh', 'yozh' ]
```

Limiting the output keeps the early alternatives and leaves the rest of the word untouched.

```ts
const transliterate = transliterateGenerator(maps.latinToCyrillic, 5);

transliterate('schastie');
// [ 'зкхastie', 'скхastie', 'зчastie', 'счastie', 'шastie', 'щastie' ]
```

### Custom maps

A transliteration map is a simple dictionary where keys are source sequences and values are arrays of replacement strings:

```ts
import transliterateGenerator from 'transliterate-generator';

const pigLatinMap = {
  hello: ['ellohay'],
  world: ['orldway'],
};

const pigLatin = transliterateGenerator(pigLatinMap, Infinity);

pigLatin('helloworld');
// [ 'ellohayorldway' ]
```

You can mix single characters and longer sequences in the same map. The generator automatically checks every substring up to the longest key in the map.

## API

### `transliterateGenerator(map, maxTranslits?)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `map` | `TranslateMap` | Dictionary of source substrings to replacement arrays. |
| `maxTranslits` | `number \| null` | Optional upper bound on the number of transliterations that will be expanded. Use `Infinity` for unrestricted output or leave `null` (default) to disable expansions entirely. |

Returns a function `(input: string) => string[]` that produces every transliteration permitted by the map while respecting the limit.

### Built-in maps

Import the `maps` helper to access the bundled transliteration tables:

- `maps.cyrillicToLatin`
- `maps.latinToCyrillic`

These maps are defined in [`src/alphabetMaps`](./src/alphabetMaps) and cover common one-to-many letter replacements.

## Development

```bash
npm install      # install dependencies
npm run build    # build the library with Rollup
npm test         # run Jest against the built bundle (requires npm run build first)
npm run lint     # run ESLint on the TypeScript sources
npm run format   # verify code formatting with Prettier
```

## License

MIT © [Volodin Sergei](https://github.com/vileven)
