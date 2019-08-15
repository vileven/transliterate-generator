import {TranslateMap} from '../interfaces/TranslateMap';
import 'core-js/features/array/flat-map';

export const transliterateGenerator = (map: TranslateMap) => (s: string) => {
	// в мапку будут складываться все варианты транслитериции буква за буквой
	const resultMap: { [key: string]: string[] } = {'': ['']};
	const maxWidth = Math.max(...Object.keys(map).map(key => key.length));

	// цикл по буквам слова
	for (let i = 0; i < s.length; i++) {
		// цикл до максимальной длины замены
		for (let j = 0; j < maxWidth; j++) {

			if (i - j < 0) {
				break;
			}

			// формируем подстроку которую будем менять
			const sequence = s.slice(i - j, i + 1);

			// массив возможных замен последовательности sequence
			const translitArr = map[sequence];

			// рассматриваемая строка в исходном алфавите
			const initialStr = s.slice(0, i + 1);

			// если не нашлось транслитерации для последовательности символов
			// просто её не делаем вообще
			if (!translitArr) {
				resultMap[initialStr] = (resultMap[initialStr] || [])
					.concat([initialStr]);
				break;
			}

			// берём результат до рассматриваемой подстроки
			// Это нужно поскольку мы можем рассматривать группы символов и
			// спускаться назад в глубину слова.
			let tempRes = resultMap[s.slice(0, (i - sequence.length + 1))];

			// получаем все варианты замены текущей подстроки
			tempRes = translitArr.flatMap((translitChar: string) => {
				return tempRes.map((str) => str + translitChar);
			});

			// прибавляем к текущему варианту слова, получившееся транслитерации
			// для рассматриваемой последовательности
			resultMap[initialStr] = (resultMap[initialStr] || []).concat(tempRes);
		}
	}

	return resultMap[s];
};
