import styles from './PopUpContainer.module.scss'
import PopUpSkeleton from './PopUpSkeleton'

function PopUpContainer({
  children,
  className,
  onCancel = () => {},
  ...params
}) {
  return (
    <PopUpSkeleton {...params} onClickCloseButton={onCancel}>
      <div className={[styles.popUpContainer, className].join(' ')}>
        {children}
      </div>
    </PopUpSkeleton>
  )
}

export default PopUpContainer
