import FrameContent from './FrameContent'
import styles from './FrameContentWithLabel.module.scss'

function FrameContentWithLabel({
  children,
  labelText,
  className,
  labelClassName,
  frameClassName,
  frameContentClassName,
  frameStyle,
  frameContentStyle,
  ...params
}) {
  return (
    <div className={[styles.frameContentWithLabel, className].join(' ')}>
      <label
        className={[
          styles.frameContentWithLabel__label,
          'text',
          labelClassName,
        ].join(' ')}
      >
        {labelText}
      </label>
      <FrameContent
        {...params}
        className={frameClassName}
        contentClassName={frameContentClassName}
        style={frameStyle}
        contentStyle={frameContentStyle}
      >
        {children}
      </FrameContent>
    </div>
  )
}

export default FrameContentWithLabel
