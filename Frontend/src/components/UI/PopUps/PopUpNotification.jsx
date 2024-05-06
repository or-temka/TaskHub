import Button from '../Buttons/Button'
import PopUp from './PopUp'

import styles from './PopUpNotification.module.scss'

function PopUpNotification({
  headerText = 'Уведомление',
  text = '',
  onCancel = () => {},
  className,
  contentClassName,
  ...params
}) {
  return (
    <PopUp
      {...params}
      headerText={headerText}
      className={[styles.popUpNotification, className].join(' ')}
      contentClassName={[
        styles.popUpNotification__content,
        contentClassName,
      ].join(' ')}
      onCancel={onCancel}
      onClickBack={onCancel}
    >
      <span className={styles.popUpNotification__text}>{text}</span>

      <div className={styles.popUpNotification__buttonsContainer}>
        <Button
          title="Ок"
          className={styles.popUpNotification__closeBtn}
          onClick={onCancel}
        />
      </div>
    </PopUp>
  )
}

export default PopUpNotification
