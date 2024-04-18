import Button from './Button'

import styles from './DangerButton.module.scss'

function DangerButton({ title, className, onClick = () => {}, ...params }) {
  return (
    <Button
      {...params}
      title={title}
      onClick={onClick}
      className={[styles.dangerButton, className].join(' ')}
    />
  )
}

export default DangerButton
