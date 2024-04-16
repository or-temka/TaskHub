import styles from './Button.module.css'

function Button({ title = '', buttonClassName }) {
  return (
    <button className={[styles.button, buttonClassName].join(' ')}>
      {title}
    </button>
  )
}

export default Button
