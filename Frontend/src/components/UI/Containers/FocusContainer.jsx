import styles from './FocusContainer.module.scss'

function FocusContainer({ children, className }) {
  return (
    <div className={[styles.focusContainer, className].join(' ')}>
      {children}
    </div>
  )
}

export default FocusContainer
