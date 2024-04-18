import Button from './Button'

import styles from './PrimaryButton.module.scss'

function PrimaryButton({
  title,
  className,
  isPassive,
  onClick = () => {},
  ...params
}) {
  return (
    <Button
      {...params}
      title={title}
      className={[
        styles.primaryButton,
        className,
        isPassive && styles.primaryButton_passive,
      ].join(' ')}
      onClick={onClick}
    />
  )
}

export default PrimaryButton
