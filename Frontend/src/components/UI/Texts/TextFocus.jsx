import styles from './TextFocus.module.scss'

function TextFocus({
  children,
  className,
  backgroundColor = 'var(--background-focus-color)',
  isThin,
}) {
  return (
    <span
      className={[
        styles.textFocus,
        className,
        isThin && styles.textFocus__thinText,
      ].join(' ')}
      style={{ backgroundColor: backgroundColor }}
    >
      {children}
    </span>
  )
}

export default TextFocus
