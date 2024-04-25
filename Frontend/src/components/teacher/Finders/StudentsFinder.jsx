import FinderSkeleton from './FinderSkeleton'
import TextButtonSorter from '../../UI/Buttons/TextButtonSorter'
import StudentsTable from '../Tables/StudentsTable'

function StudentsFinder({
  users,
  groups,
  checkedGroups,
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
      text="Номеру группы"
      onClick={(status) => setSorter({ groupNum: status })}
      userStatus={sorter.groupNum}
    />,
    <TextButtonSorter
      text="Среднему баллу"
      sortUpText="0-5"
      sortDownText="5-0"
      onClick={(status) => setSorter({ avarageMark: status })}
      userStatus={sorter.avarageMark}
    />,
    <TextButtonSorter
      text="Количеству выполненных заданий"
      sortUpText="0-∞"
      sortDownText="∞-0"
      onClick={(status) => setSorter({ doneTaskCount: status })}
      userStatus={sorter.doneTaskCount}
    />,
  ]

  return (
    <FinderSkeleton
      textButtonsSorters={textButtonsSorters}
      inputSearchPlaceholder="Поиск по ФИО"
      searchInputValue={searchInput}
      onChangeSearchInput={(e) => setSearchInput(e.target.value)}
    >
      <StudentsTable
        users={users}
        groups={groups}
        search={searchInput}
        sorter={sorter}
        checkedGroups={checkedGroups}
        score={score}
        onClickTr={onClickTr}
      />
    </FinderSkeleton>
  )
}

export default StudentsFinder
