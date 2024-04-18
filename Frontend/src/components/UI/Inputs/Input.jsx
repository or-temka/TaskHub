import styles from './Input.module.scss'

function Input({
  placeholder = '',
  value = '',
  errorText = '',
  onChange = () => {},
  onClick = () => {},
  className,
  wrapperClassName,
  ...params
}) {
  return (
    <div className={[styles.input, wrapperClassName].join(' ')}>
      <input
        {...params}
        value={value}
        onChange={onChange}
        onClick={onClick}
        placeholder={placeholder}
        className={[
          styles.input__input,
          className,
          errorText && styles.input__input_error,
        ].join(' ')}
      />
      {errorText && (
        <span className={['small-text', styles.input__errorText].join(' ')}>
          {errorText}
        </span>
      )}
    </div>
  )
}

export default Input
