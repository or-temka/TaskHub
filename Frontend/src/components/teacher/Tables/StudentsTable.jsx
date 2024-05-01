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
  onClickTr = () => {},
  ...params
}) {
  const tableThs = [
    'ФИО',
    'Логин',
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
    let userGroup
    let userGroupName
    let userGroupId
    if (user.groupId) {
      userGroup = groups.find((group) => group._id === user.groupId)
      userGroupName = userGroup.name
      userGroupId = userGroup._id
    }

    // Фильтр по группе
    if (checkedGroups.size !== 0 && !checkedGroups.has(userGroupId)) {
      return
    }
    const userForTable = {
      tds: [
        user.name,
        user.login,
        user.password,
        userGroupName || '',
        user.statistics.avarageMark,
        user.statistics.complitedTasks,
      ],
      value: user._id,
    }
    tableTrsOfTds.push(userForTable)
  })

  // Сортировка, если указана
  if (Object.keys(sorter).length !== 0) {
    const sorterName = Object.keys(sorter)[0]
    let sortField
    if (sorterName === 'alphabet') sortField = 0
    else if (sorterName === 'groupNum') sortField = 3
    else if (sorterName === 'avarageMark') sortField = 4
    else if (sorterName === 'doneTaskCount') sortField = 5

    tableTrsOfTds = sortBy(
      tableTrsOfTds,
      sortField,
      Object.values(sorter)[0] === 'up' ? false : true
    )
  }

  // Обработка нажатия на Tr с данными
  const onClickTrHandler = (value) => {
    onClickTr(value)
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
