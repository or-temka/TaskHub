import styles from './ContentContainer.module.css'

function ContentContainer({
  children,
  headBorderColor,
  className,
  classNameForContentBox,
}) {
  if (!headBorderColor) {
    return (
      <div className={[styles.contentContainer, className].join(' ')}>
        <div
          className={[
            styles.contentContainer__content,
            classNameForContentBox,
          ].join(' ')}
        >
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className={[styles.contentContainer, className].join(' ')}>
      <div
        className={styles.contentContainer__headBorder}
        style={{ backgroundColor: headBorderColor }}
      ></div>
      <div
        className={[
          styles.contentContainer__content,
          classNameForContentBox,
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  )
}

export default ContentContainer
