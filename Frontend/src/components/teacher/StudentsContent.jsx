import { useState } from 'react'
import StudentsFilter from './Filters/StudentsFilter'
import StudentsFinder from './Finders/StudentsFinder'
import styles from './StudentsContent.module.scss'

function StudentsContent({
  users,
  groups,
  className,
  onClickTr = () => {},
  ...params
}) {
  const [checkedGroups, setCheckedGroups] = useState(new Set())
  const [score, setScore] = useState({ indicator: 'up', value: '' })
  const [sorter, setSorter] = useState({})
  const [searchInput, setSearchInput] = useState('')

  const onCheckedGroups = (checked) => setCheckedGroups(checked)
  const onEnteredScore = (score) => setScore(score)

  // Нажатие по "очистить все фильтры" - обнуление всего
  const onClickClear = () => {
    setCheckedGroups(new Set())
    setScore({ indicator: 'up', value: '' })
    setSorter({})
    setSearchInput('')
  }

  return (
    <>
      <div
        {...params}
        className={[styles.studentsContent, className].join(' ')}
      >
        <StudentsFilter
          groups={groups}
          onCheckedGroups={onCheckedGroups}
          onEnteredScore={onEnteredScore}
          onClickClear={onClickClear}
          checkedGroupsValue={checkedGroups}
          scoreValue={score}
        />

        <StudentsFinder
          users={users}
          groups={groups}
          checkedGroups={checkedGroups}
          score={score}
          sorter={sorter}
          searchInput={searchInput}
          setSorter={setSorter}
          setSearchInput={setSearchInput}
          onClickTr={onClickTr}
        />
      </div>
    </>
  )
}

export default StudentsContent
