import styles from './Button.module.scss'

function Button({
  title = '',
  disabled,
  className,
  onClick = () => {},
  ...params
}) {
  return (
    <button
      {...params}
      disabled={disabled}
      className={[
        styles.button,
        className,
        disabled && styles.button_disabled,
      ].join(' ')}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default Button
