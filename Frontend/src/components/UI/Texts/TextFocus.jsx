import styles from './TextFocus.module.css'

function TextFocus({ children, className, isThin }) {
  return (
    <span
      className={[
        styles.textFocus,
        className,
        isThin && styles.textFocus__thinText,
      ].join(' ')}
    >
      {children}
    </span>
  )
}

export default TextFocus
