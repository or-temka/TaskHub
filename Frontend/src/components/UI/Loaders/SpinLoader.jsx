import styles from './SpinLoader.module.scss'

function SpinLoader(className, { ...params }) {
  return (
    <div {...params} className={[styles.spinLoader, className].join(' ')}></div>
  )
}

export default SpinLoader
