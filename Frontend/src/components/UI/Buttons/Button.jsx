import styles from './Button.module.css'

function Button({
  title = 'Меню',
  paddingHorizontal = 20,
  paddingVertical = 8,
}) {
  return (
    <button
      className={styles.button}
      style={{ padding: `${paddingVertical}px ${paddingHorizontal}px` }}
    >
      {title}
    </button>
  )
}

export default Button
