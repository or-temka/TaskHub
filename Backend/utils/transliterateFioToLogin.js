// Преобразует ФИО на русском языке в логин (пример: Черепягина Елизавета Владимировна -> cherepyagina)

import transliterate from './transliterate.js'

const transliterateFioToLogin = (fio) => {
  const fioArray = fio.trim().replace(/\s+/g, ' ').split(' ')
  const surname = fioArray[0] || ''
  const nameFirstLatter = fioArray[1] ? fioArray[1][0] : ''
  const patronymicFirstLatter = fioArray[2] ? fioArray[2][0] : ''
  const pointLatter = nameFirstLatter ? '.' : ''

  return transliterate(
    surname + pointLatter + nameFirstLatter + patronymicFirstLatter
  )
}

export default transliterateFioToLogin
