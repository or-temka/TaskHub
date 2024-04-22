import { Link } from 'react-router-dom'
import Button from '../components/UI/Buttons/Button'

import styles from './PageNotFound.module.scss'

function PageNotFound({ setPageName }) {
  useEffect(() => {
    setPageName('Страница не найдена')
  }, [])
  return (
    <div className={styles.pageNotFound}>
      <span className={styles.pageNotFound__message}>
        Упс... кажется, страница не найдена.
      </span>
      <Link to="/" className={styles.pageNotFound__homeLink}>
        <Button title="На главную" />
      </Link>
    </div>
  )
}

export default PageNotFound
