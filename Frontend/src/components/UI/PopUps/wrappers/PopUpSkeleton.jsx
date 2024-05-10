import { useState } from 'react'

import CloseButton from '../../Buttons/CloseButton'

import styles from './PopUpSkeleton.module.scss'

function PopUpSkeleton({
  children,
  onClickBack = () => {},
  onClickCloseButton,
  isShowCloseButton = true,
  className,
  backClassName,
  contentClassName,
  ...params
}) {
  const [visiblePopUp, setVisiblePopUp] = useState(true)

  if (!onClickCloseButton) {
    onClickCloseButton = () => setVisiblePopUp(false)
  }

  if (!visiblePopUp) {
    return
  }
  return (
    <div {...params} className={[styles.popUpSkeleton, className].join(' ')}>
      <div
        className={[styles.popUpSkeleton__back, backClassName].join(' ')}
        onClick={onClickBack}
      ></div>
      <div
        className={[styles.popUpSkeleton__content, contentClassName].join(' ')}
      >
        {children}
        {isShowCloseButton && (
          <CloseButton
            className={styles.popUpSkeleton__closeButton}
            onClick={onClickCloseButton}
          />
        )}
      </div>
    </div>
  )
}

export default PopUpSkeleton
