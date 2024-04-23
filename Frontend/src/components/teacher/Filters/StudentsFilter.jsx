import { useState } from 'react'

import FilterSkeleton from './FilterSkeleton'
import FrameContentWithLabel from '../../frames/FrameContentWithLabel'
import Checkbox from '../../UI/Inputs/Checkbox'
import InputIndicator from '../../UI/Inputs/InputIndicator'

import styles from './Filter.module.scss'

function StudentsFilter({ groups, className, ...params }) {
  const [checkedGroups, setCheckedGroups] = useState({})
  const [score, setScore] = useState({ indicator: 'top', value: '' })

  return (
    <FilterSkeleton
      {...params}
      className={[styles.filter, className].join(' ')}
    >
      <FrameContentWithLabel
        labelText="Группа:"
        frameContentClassName={styles.filter__frameContentContent}
        frameClassName={styles.filter__frameContent}
        
      >
        {groups.map((group) => (
          <Checkbox
            key={group.id}
            label={group.name}
            checked={checkedGroups[group.id]}
            onChange={() =>
              setCheckedGroups({
                ...checkedGroups,
                [group.id]: !checkedGroups[group.id],
              })
            }
          />
        ))}
      </FrameContentWithLabel>
      <InputIndicator
        placeholder="Балл"
        value={score.value}
        onClickIndicator={(val) => setScore({ ...score, indicator: val.data })}
        onChangeInputValue={(e) =>
          setScore({ ...score, value: e.target.value })
        }
        className={styles.filter__inputIndicator}
      />
    </FilterSkeleton>
  )
}

export default StudentsFilter
