import cyrillicToLatin from './alphabetMaps/cyrillicToLatin';
import latinToCyrillic from './alphabetMaps/latinToCyrillic';
import {TranslateMap} from './interfaces/TranslateMap';
import {transliterateGenerator} from './transliterate/transliterate';

export const maps: {[key: string]: TranslateMap} = {
	cyrillicToLatin,
	latinToCyrillic,
};

export default transliterateGenerator;
