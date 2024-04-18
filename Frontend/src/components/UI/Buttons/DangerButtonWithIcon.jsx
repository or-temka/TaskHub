import buttonStyle from './Button.module.css'

import styles from './DangerButtonWithIcon.module.scss'

function DangerButtonWithIcon({
  title,
  className,
  svgElem,
  onClick = () => {},
  ...params
}) {
  return (
    <button
      {...params}
      className={[
        buttonStyle.button,
        styles.dangerButtonWithIcon,
        className,
      ].join(' ')}
      onClick={onClick}
    >
      {svgElem}
      <span>{title}</span>
    </button>
  )
}

export default DangerButtonWithIcon
