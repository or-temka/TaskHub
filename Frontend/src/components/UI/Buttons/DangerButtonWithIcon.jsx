import buttonStyle from './Button.module.css'

import styles from './DangerButtonWithIcon.module.css'

function DangerButtonWithIcon({
  title,
  buttonClassName = '',
  svgElem,
  onClick = () => {},
}) {
  return (
    <button
      className={[
        buttonStyle.button,
        styles.dangerButtonWithIcon,
        buttonClassName,
      ].join(' ')}
      onClick={onClick}
    >
      {svgElem}
      <span>{title}</span>
    </button>
  )
}

export default DangerButtonWithIcon
