import Table from '../../UI/Tables/Table'

import sortBy from '../../../utils/sortBy'

import styles from './GroupsTable.module.scss'

function GroupsTable({
  users,
  groups,
  search = '',
  sorter,
  className,
  score,
  onClickTr = () => {},
  ...params
}) {
  const tableThs = ['Название группы', 'Число студентов', 'Курс']

  // Создание массива групп и фильтрация на месте
  let tableTrsOfTds = []
  groups.forEach((group) => {
    // Фильтр поиска
    if (search && !group.name.toLowerCase().includes(search.toLowerCase())) {
      return
    }
    // Фильтр по баллу score
    if (score.value) {
      const studentsCount = group.studentsId.length
      if (score.indicator === 'up') {
        if (studentsCount < score.value) return
      } else {
        if (studentsCount > score.value) return
      }
    }

    const groupForTable = {
      tds: [group.name, group.studentsId.length, group.cource],
      value: group.id,
    }
    tableTrsOfTds.push(groupForTable)
  })

  // Сортировка, если указана
  if (Object.keys(sorter).length !== 0) {
    const sorterName = Object.keys(sorter)[0]
    let sortField
    if (sorterName === 'alphabet') sortField = 0
    else if (sorterName === 'studentsCount') sortField = 1
    else if (sorterName === 'courceNum') sortField = 2

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
      className={[styles.groupsTable, className].join(' ')}
      trClassName={styles.groupsTable__tableTr}
      onClickTr={(value) => onClickTrHandler(value)}
    />
  )
}

export default GroupsTable
