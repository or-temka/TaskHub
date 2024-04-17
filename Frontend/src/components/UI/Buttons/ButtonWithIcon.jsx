import buttonStyle from './Button.module.scss'
import styles from './ButtonWithIcon.module.scss'

function ButtonWithIcon({
  title,
  svgElem,
  buttonClassName,
  onClick = () => {},
}) {
  return (
    <button
      className={[
        buttonStyle.button,
        styles.buttonWithIcon,
        buttonClassName,
      ].join(' ')}
      onClick={onClick}
    >
      {svgElem}
      <span>{title}</span>
    </button>
  )
}

export default ButtonWithIcon
