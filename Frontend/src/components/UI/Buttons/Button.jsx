import styles from './Button.module.scss'

function Button({ title = '', className, onClick = () => {}, ...params }) {
  return (
    <button
      {...params}
      className={[styles.button, className].join(' ')}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default Button
