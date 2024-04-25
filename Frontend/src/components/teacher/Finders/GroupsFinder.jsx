import FinderSkeleton from './FinderSkeleton'
import TextButtonSorter from '../../UI/Buttons/TextButtonSorter'
import GroupsTable from '../Tables/GroupsTable'

function GroupsFinder({
  users,
  groups,
  score,
  sorter,
  searchInput,
  setSorter = () => {},
  setSearchInput = () => {},
  onClickTr = () => {},
}) {
  const textButtonsSorters = [
    <TextButtonSorter
      text="Алфавиту"
      onClick={(status) => setSorter({ alphabet: status })}
      userStatus={sorter.alphabet}
    />,
    <TextButtonSorter
      text="Числу студентов"
      sortUpText="0-∞"
      sortDownText="∞-0"
      onClick={(status) => setSorter({ studentsCount: status })}
      userStatus={sorter.studentsCount}
    />,
    <TextButtonSorter
      text="Курсу"
      sortUpText="0-∞"
      sortDownText="∞-0"
      onClick={(status) => setSorter({ courceNum: status })}
      userStatus={sorter.courceNum}
    />,
  ]

  return (
    <FinderSkeleton
      textButtonsSorters={textButtonsSorters}
      inputSearchPlaceholder="Поиск по названию группы"
      searchInputValue={searchInput}
      onChangeSearchInput={(e) => setSearchInput(e.target.value)}
    >
      <GroupsTable
        users={users}
        groups={groups}
        search={searchInput}
        sorter={sorter}
        score={score}
        onClickTr={onClickTr}
      />
    </FinderSkeleton>
  )
}

export default GroupsFinder
