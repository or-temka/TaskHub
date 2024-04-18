import styles from './CloseButton.module.scss'

function CloseButton({
  onClick = () => {},
  className,
  crossClassName,
  isWithoutPadding,
  ...params
}) {
  return (
    <div
      {...params}
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
