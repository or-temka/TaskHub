import FloatingPanelContainer from './wrappers/FloatingPanelContainer'

import styles from './Timer.module.scss'

function Timer({ time, className, wrapperClassName, ...params }) {
  return (
    <FloatingPanelContainer className={wrapperClassName}>
      <span {...params} className={['h2', styles.timer, className].join(' ')}>
        {time}
      </span>
    </FloatingPanelContainer>
  )
}

export default Timer
