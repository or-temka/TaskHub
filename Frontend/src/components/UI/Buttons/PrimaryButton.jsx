import Button from './Button'

import styles from './PrimaryButton.module.scss'

function PrimaryButton({
  title,
  className,
  isPassive,
  disabled,
  loading,
  onClick = () => {},
  ...params
}) {
  return (
    <Button
      {...params}
      title={loading ? 'Загрузка...' : title}
      disabled={disabled || loading}
      className={[
        styles.primaryButton,
        className,
        isPassive && styles.primaryButton_passive,
        (disabled || loading) && styles.primaryButton_disabled,
      ].join(' ')}
      onClick={onClick}
    />
  )
}

export default PrimaryButton
