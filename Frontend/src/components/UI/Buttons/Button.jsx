import styles from './Button.module.css'

function Button({
  title = '',
  buttonClassName,
  onClick = () => {},
}) {
  return (
    <button
      className={[styles.button, buttonClassName].join(' ')}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default Button
