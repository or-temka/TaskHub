import styles from './PopUp.module.scss'
import PopUpContainer from './wrappers/PopUpContainer'

function PopUp({
  children,
  headerText = '',
  className,
  headerClassName,
  headerTextClassName,
  contentClassName,
  ...params
}) {
  return (
    <PopUpContainer {...params} className={[styles.popUp, className].join(' ')}>
      {headerText && (
        <>
          <header
            className={[styles.popUp__header, 'text', headerClassName].join(
              ' '
            )}
          >
            <span className={['text', headerTextClassName].join(' ')}>
              {headerText}
            </span>
          </header>
        </>
      )}
      <main className={[styles.popUp__content, contentClassName].join(' ')}>
        {children}
      </main>
    </PopUpContainer>
  )
}

export default PopUp
