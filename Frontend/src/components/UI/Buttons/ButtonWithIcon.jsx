import buttonStyle from './Button.module.css'
import styles from './ButtonWithIcon.module.css'

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
