import styles from './ColorTextMsg.module.css'

function ColorTextMsg({ children, className, msgType = 'success' }) {
  const textColorType =
    msgType === 'success'
      ? styles.colorTextMsg__success
      : styles.colorTextMsg__warning

  return (
    <span className={[styles.colorTextMsg, textColorType, className].join(' ')}>
      {children}
    </span>
  )
}

export default ColorTextMsg
