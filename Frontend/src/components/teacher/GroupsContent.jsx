import { useState } from 'react'

import GroupsFilter from './Filters/GroupsFilter'
import GroupsFinder from './Finders/GroupsFinder'
import styles from './GroupsContent.module.scss'

function GroupsContent({
  users,
  groups,
  className,
  onClickTr = () => {},
  ...params
}) {
  const [score, setScore] = useState({ indicator: 'up', value: '' })
  const [sorter, setSorter] = useState({})
  const [searchInput, setSearchInput] = useState('')

  const onEnteredScore = (score) => setScore(score)

  // Нажатие по "очистить все фильтры" - обнуление всего
  const onClickClear = () => {
    setScore({ indicator: 'up', value: '' })
    setSorter({})
    setSearchInput('')
  }

  return (
    <>
      <div {...params} className={[styles.groupsContent, className].join(' ')}>
        <GroupsFilter
          groups={groups}
          onEnteredScore={onEnteredScore}
          onClickClear={onClickClear}
          scoreValue={score}
        />

        <GroupsFinder
          users={users}
          groups={groups}
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

export default GroupsContent
