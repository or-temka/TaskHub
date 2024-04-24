import { useEffect, useState } from 'react'

import FilterSkeleton from './FilterSkeleton'
import FrameContentWithLabel from '../../frames/FrameContentWithLabel'
import Checkbox from '../../UI/Inputs/Checkbox'
import InputIndicator from '../../UI/Inputs/InputIndicator'

import styles from './Filter.module.scss'

function GroupsFilter({
  onEnteredScore = () => {},
  scoreValue,
  onClickClear = () => {},
  className,
  ...params
}) {
  const [score, setScore] = useState(scoreValue)

  useEffect(() => setScore(scoreValue), [scoreValue])

  useEffect(() => onEnteredScore(score), [score])

  return (
    <FilterSkeleton
      {...params}
      className={[styles.filter, className].join(' ')}
      onClickClear={onClickClear}
    >
      <span className={styles.filter__label}>Число студентов:</span>
      <InputIndicator
        placeholder="Кол-во чел."
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

export default GroupsFilter
