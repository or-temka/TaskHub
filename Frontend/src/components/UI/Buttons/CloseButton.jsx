import styles from './CloseButton.module.css'

function CloseButton({
  onClick = () => {},
  className,
  crossClassName,
  isWithoutPadding,
}) {
  return (
    <div
      className={[
        styles.closeButton,
        className,
        isWithoutPadding && styles.closeButton_withoutPadding,
      ].join(' ')}
      onClick={onClick}
    >
      <div
        className={[styles.closeButton__cross, crossClassName].join(' ')}
      ></div>
    </div>
  )
}

export default CloseButton
