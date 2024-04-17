import Button from './Button'

import styles from './DangerButton.module.scss'

function DangerButton({ title, buttonClassName, onClick = () => {} }) {
  return (
    <Button
      title={title}
      onClick={onClick}
      buttonClassName={[styles.dangerButton, buttonClassName].join(' ')}
    />
  )
}

export default DangerButton
