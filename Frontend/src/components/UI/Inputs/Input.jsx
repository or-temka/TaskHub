import styles from './Input.module.scss'

function Input({
  placeholder = '',
  value = '',
  onChange = () => {},
  onClick = () => {},
  className,
  style,
  ...params
}) {
  return (
    <input
      {...params}
      value={value}
      onChange={onChange}
      onClick={onClick}
      placeholder={placeholder}
      className={[styles.input, className].join(' ')}
      style={style}
    />
  )
}

export default Input
