import buttonStyle from './Button.module.scss'
import styles from './ButtonWithIcon.module.scss'

function ButtonWithIcon({
  title,
  svgElem,
  className,
  onClick = () => {},
  ...params
}) {
  return (
    <button
      {...params}
      className={[buttonStyle.button, styles.buttonWithIcon, className].join(
        ' '
      )}
      onClick={onClick}
    >
      {svgElem}
      <span>{title}</span>
    </button>
  )
}

export default ButtonWithIcon
