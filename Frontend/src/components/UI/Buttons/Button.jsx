import styles from './Button.module.css'

function Button({ title = 'Меню', buttonClassName }) {
  return (
    <button className={[styles.button, buttonClassName].join(' ')}>
      {title}
    </button>
  )
}

export default Button
