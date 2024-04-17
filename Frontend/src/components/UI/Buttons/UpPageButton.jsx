import styles from './UpPageButton.module.scss'

function UpPageButton({ className, ...params }) {
  return (
    <button
      {...params}
      className={[styles.upPageButton, className].join(' ')}
    ></button>
  )
}

export default UpPageButton
