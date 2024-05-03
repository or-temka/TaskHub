// Преобразует строку типа "привет" в "privet" (с русского на латиницу) другие знаки не трогает

const transliterate = (str) => {
  const cyrillicToLatinMap = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'yo',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'sch',
    ъ: '',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
  }

  return str
    .split('')
    .map((char) => {
      const newChar = cyrillicToLatinMap[char.toLowerCase()]
      if (newChar === '') return ''
      if (!newChar) return char
      return newChar
    })
    .join('')
}

export default transliterate
