import styles from './ContentHeaderLabel.module.css'

function ContentHeaderLabel({
  title,
  children,
  className,
  classNameForContent,
}) {
  return (
    <header className={[styles.contentHeaderLabel, className].join(' ')}>
      <h4>{title}</h4>
      <div
        className={[
          styles.contentHeaderLabel__content,
          classNameForContent,
        ].join(' ')}
      >
        {children}
      </div>
    </header>
  )
}

export default ContentHeaderLabel
