import styles from './ContentHeader.module.scss'

function ContentHeader({ title, children, className, classNameForContent }) {
  return (
    <header className={[styles.contentHeader, className].join(' ')}>
      <h1>{title}</h1>
      <div
        className={[styles.contentHeader__content, classNameForContent].join(
          ' '
        )}
      >
        {children}
      </div>
    </header>
  )
}

export default ContentHeader
