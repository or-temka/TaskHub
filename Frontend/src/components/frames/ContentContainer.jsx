import styles from './ContentContainer.module.scss'

function ContentContainer({
  children,
  headBorderColor,
  className,
  wrapperClassName,
}) {
  if (!headBorderColor) {
    return (
      <div className={[styles.contentContainer, wrapperClassName].join(' ')}>
        <div
          className={[styles.contentContainer__content, className].join(' ')}
        >
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className={[styles.contentContainer, wrapperClassName].join(' ')}>
      <div
        className={styles.contentContainer__headBorder}
        style={{ backgroundColor: headBorderColor }}
      ></div>
      <div className={[styles.contentContainer__content, className].join(' ')}>
        {children}
      </div>
    </div>
  )
}

export default ContentContainer
