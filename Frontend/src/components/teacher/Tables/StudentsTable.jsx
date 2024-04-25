import Table from '../../UI/Tables/Table'

import sortBy from '../../../utils/sortBy'

import styles from './StudentsTable.module.scss'

function StudentsTable({
  users,
  groups,
  search = '',
  sorter,
  className,
  checkedGroups,
  score,
  ...params
}) {
  const tableThs = [
    'ФИО',
    'Пароль',
    'Группа',
    'Средний балл',
    'Кол-во выполненных заданий',
  ]

  // Создание массива пользователей и фильтрация на месте
  let tableTrsOfTds = []
  users.forEach((user) => {
    // Фильтр поиска
    if (search && !user.name.toLowerCase().includes(search.toLowerCase())) {
      return
    }
    // Фильтр по баллу score
    if (score.value) {
      const userMark = user.statistics.avarageMark
      if (score.indicator === 'up') {
        if (userMark < score.value) return
      } else {
        if (userMark > score.value) return
      }
    }
    const userGroup = groups.find((group) => group.id === user.groupId)
    const userGroupName = userGroup.name
    const userGroupId = userGroup.id

    // Фильтр по группе
    if (checkedGroups.size !== 0 && !checkedGroups.has(userGroupId)) {
      return
    }
    const userForTable = {
      tds: [
        user.name,
        user.password,
        userGroupName,
        user.statistics.avarageMark,
        user.statistics.complitedTasks,
      ],
      value: user.id,
    }
    tableTrsOfTds.push(userForTable)
  })

  // Сортировка, если указана
  if (Object.keys(sorter).length !== 0) {
    const sorterName = Object.keys(sorter)[0]
    let sortField
    if (sorterName === 'alphabet') sortField = 0
    else if (sorterName === 'groupNum') sortField = 2
    else if (sorterName === 'avarageMark') sortField = 3
    else if (sorterName === 'doneTaskCount') sortField = 4

    tableTrsOfTds = sortBy(
      tableTrsOfTds,
      sortField,
      Object.values(sorter)[0] === 'up' ? false : true
    )
  }

  // Обработка нажатия на Tr с данными
  const onClickTrHandler = (value) => {
    console.log(value)
  }

  return (
    <Table
      {...params}
      ths={tableThs}
      trsOfTds={tableTrsOfTds}
      className={[styles.studentsTable, className].join(' ')}
      trClassName={styles.studentsTable__tableTr}
      onClickTr={(value) => onClickTrHandler(value)}
    />
  )
}

export default StudentsTable
