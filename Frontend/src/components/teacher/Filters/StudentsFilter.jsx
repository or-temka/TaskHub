import { useEffect, useState } from 'react'

import FilterSkeleton from './FilterSkeleton'
import FrameContentWithLabel from '../../frames/FrameContentWithLabel'
import Checkbox from '../../UI/Inputs/Checkbox'
import InputIndicator from '../../UI/Inputs/InputIndicator'

import styles from './Filter.module.scss'

function StudentsFilter({
  groups,
  onCheckedGroups = () => {},
  checkedGroupsValue,
  onEnteredScore = () => {},
  scoreValue,
  onClickClear = () => {},
  className,
  ...params
}) {
  const [checkedGroups, setCheckedGroups] = useState(checkedGroupsValue)
  const [score, setScore] = useState(scoreValue)

  useEffect(() => setScore(scoreValue), [scoreValue])
  useEffect(() => setCheckedGroups(checkedGroupsValue), [checkedGroupsValue])

  useEffect(() => onEnteredScore(score), [score])

  // Для управления checkedGroups
  useEffect(() => onCheckedGroups(checkedGroups), [checkedGroups])
  const addToCheckedGroups = (value) => {
    const newSet = new Set(checkedGroups)
    newSet.add(value)
    setCheckedGroups(newSet)
  }
  const removeFromCheckedGroups = (value) => {
    const newSet = new Set(checkedGroups)
    newSet.delete(value)
    setCheckedGroups(newSet)
  }

  // сортировка групп
  groups.sort((a, b) => (a.name < b.name ? -1 : 1))

  return (
    <FilterSkeleton
      {...params}
      className={[styles.filter, className].join(' ')}
      onClickClear={onClickClear}
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
            checked={checkedGroups.has(group.id)}
            onChange={(f) => {
              f.target.checked
                ? addToCheckedGroups(group.id)
                : removeFromCheckedGroups(group.id)
            }}
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
