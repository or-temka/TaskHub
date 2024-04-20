import TextFocus from '../UI/Texts/TextFocus'
import { ReactComponent as ToArrowSVG } from '../../assets/svg/to-arrow.svg'

import styles from './TaskAdoptStatisticLine.module.scss'

function TaskAdoptStatisticLine({
  title = '',
  value = '',
  outOfValue = '',
  adoptInfo = '',
  textAfterValue = '',
  valueChangeTo = '',
  valueBackgroundColor = 'var(--background-focus-2-color)',
  valueChangeToBackgroundColor = 'var(--background-focus-2-color)',
  className,
  ...params
}) {
  return (
    <div {...params} className={styles.taskAdoptStatisticLine}>
      <span
        className={['text', styles.taskAdoptStatisticLine__label].join(' ')}
      >
        {title}
      </span>
      <TextFocus
        className={styles.taskAdoptStatisticLine__value}
        backgroundColor={valueBackgroundColor}
      >
        {value}
        {outOfValue && (
          <span className={styles.taskAdoptStatisticLine__outOfValue}>
            {' '}
            / {outOfValue}
          </span>
        )}
      </TextFocus>
      {valueChangeTo && (
        <>
          <ToArrowSVG />
          <TextFocus
            className={styles.taskAdoptStatisticLine__value}
            backgroundColor={valueChangeToBackgroundColor}
          >
            {valueChangeTo}
            {outOfValue && (
              <span className={styles.taskAdoptStatisticLine__outOfValue}>
                {' '}
                / {outOfValue}
              </span>
            )}
          </TextFocus>
        </>
      )}

      {textAfterValue && <span className={'text'}>{textAfterValue}</span>}

      {adoptInfo && (
        <span className={styles.taskAdoptStatisticLine__adoptInfo}>
          {adoptInfo}
        </span>
      )}
    </div>
  )
}

export default TaskAdoptStatisticLine
