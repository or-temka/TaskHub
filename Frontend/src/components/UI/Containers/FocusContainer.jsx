import styles from './FocusContainer.module.css'

function FocusContainer({ children, className }) {
  return (
    <div className={[styles.focusContainer, className].join(' ')}>
      {children}
    </div>
  )
}

export default FocusContainer
