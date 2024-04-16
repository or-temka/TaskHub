import buttonStyle from './Button.module.css'
import styles from './ButtonWithIcon.module.css'

function ButtonWithIcon({ title, svgElem }) {
  return (
    <button className={[buttonStyle.button, styles.buttonWithIcon].join(' ')}>
      {svgElem}
      <span>{title}</span>
    </button>
  )
}

export default ButtonWithIcon
