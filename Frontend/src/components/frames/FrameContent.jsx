import styles from './FrameContent.module.css'

function FrameContent({
  className,
  contentClassName,
  style,
  contentStyle,
  children,
  ...params
}) {
  return (
    <div
      {...params}
      className={[styles.frameContent, className].join(' ')}
      style={style}
    >
      <div
        className={[styles.frameContent__content, contentClassName].join(' ')}
        style={contentStyle}
      >
        {children}
      </div>
    </div>
  )
}

export default FrameContent
