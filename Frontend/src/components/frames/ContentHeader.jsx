import styles from './ContentHeader.module.css'

function ContentHeader({ title, children }) {
  return (
    <header className={styles.contentHeader}>
      <div>
        <h1>{title}</h1>
      </div>
      <div>{children}</div>
    </header>
  )
}

export default ContentHeader
