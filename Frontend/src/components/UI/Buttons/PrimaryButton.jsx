import Button from './Button'

import styles from './PrimaryButton.module.css'

function PrimaryButton({ title, buttonClassName, onClick = () => {} }) {
  return (
    <Button
      title={title}
      buttonClassName={[styles.primaryButton, buttonClassName].join(' ')}
      onClick={onClick}
    />
  )
}

export default PrimaryButton
