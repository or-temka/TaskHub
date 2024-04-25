import styles from './TextArea.module.scss'

function TextArea({
  placeholder,
  errorText,
  value,
  cols = '45',
  rows = '5',
  onChange = () => {},
  onClick = () => {},
  className,
  ...params
}) {
  return (
    <div {...params} className={[styles.textArea, className].join(' ')}>
      <textarea
        cols={cols}
        rows={rows}
        value={value}
        onChange={onChange}
        onClick={onClick}
        className={styles.textArea__input}
      ></textarea>
      {errorText && (
        <span className={['small-text', styles.textArea__errorText].join(' ')}>
          {errorText}
        </span>
      )}
    </div>
  )
}

export default TextArea
