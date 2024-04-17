import PrimaryButton from '../Buttons/PrimaryButton'
import Button from '../Buttons/Button'

import styles from './PopUpConfirmation.module.scss'
import { useState } from 'react'
import PopUp from './PopUp'

function PopUpConfirmation({
  headerLabelText = 'Подтверждение',
  labelText = '',
  text = '',
  confirmBtnText = 'Подтвердить',
  cancelBtnText = 'Отмена',
  onConfirm = () => {},
  onCancel,
  className,
  labelClassName,
  textClassName,
  contentClassName,
  confirmButtonClassName,
  cancelButtonClassName,
  ...params
}) {
  const [visiblePopUp, setVisiblePopUp] = useState(true)

  if (!onCancel) {
    onCancel = () => setVisiblePopUp(false)
  }

  if (!visiblePopUp) {
    return
  }
  return (
    <PopUp
      {...params}
      onClickCloseButton={onCancel}
      className={className}
      contentClassName={[styles.popUpConfirmation, contentClassName].join(' ')}
      headerText={headerLabelText}
      onCancel={onCancel}
    >
      <div className={styles.popUpConfirmation__contentContainer}>
        <div className={styles.popUpConfirmation__textContent}>
          <span className={['text-bold', labelClassName].join(' ')}>
            {labelText}
          </span>
          <span
            className={[
              styles.popUpConfirmation__text,
              'paragraph',
              textClassName,
            ].join(' ')}
          >
            {text}
          </span>
        </div>
        <div className={styles.popUpConfirmation__buttons}>
          <PrimaryButton
            title={confirmBtnText}
            buttonClassName={confirmButtonClassName}
            onClick={onConfirm}
          />
          <Button
            title={cancelBtnText}
            buttonClassName={cancelButtonClassName}
            onClick={onCancel}
          />
        </div>
      </div>
    </PopUp>
  )
}

export default PopUpConfirmation
