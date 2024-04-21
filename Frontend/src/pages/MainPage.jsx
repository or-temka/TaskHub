import { useEffect } from 'react'
import SpinLoader from '../components/UI/Loaders/SpinLoader'

import styles from './MainPage.module.scss'

function MainPage({ setPageName }) {
  useEffect(() => {
    setPageName('')
  }, [])

  return (
    <div className={styles.mainPage}>
      <SpinLoader />
    </div>
  )
}

export default MainPage
