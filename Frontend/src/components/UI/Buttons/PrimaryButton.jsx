import Button from './Button'

import styles from './PrimaryButton.module.css'

function PrimaryButton({
  title,
  buttonClassName,
  isPassive,
  onClick = () => {},
}) {
  return (
    <Button
      title={title}
      buttonClassName={[
        styles.primaryButton,
        buttonClassName,
        isPassive && styles.primaryButton_passive,
      ].join(' ')}
      onClick={onClick}
    />
  )
}

export default PrimaryButton
