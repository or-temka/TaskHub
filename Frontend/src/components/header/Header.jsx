import styles from './Header.module.css'

import users from '../../data/users'
import { Link, useLocation } from 'react-router-dom'

function Header({
  pageName = '',
  profileId, // <Number>
  menuButtons, // <Array of <>>
}) {
  const user = users.find((user) => user.id === profileId)
  const nowPageLocation = useLocation().pathname

  return (
    <header className={styles.header}>
      <div className={styles.header__labelContainer}>
        <Link to="/" className={styles.header__labelText}>
          USTY TaskHub
        </Link>
        {pageName && (
          <>
            <span className={styles.header__textCircle}></span>
            <Link to={nowPageLocation} className={styles.header__nowPageName}>
              {pageName}
            </Link>
          </>
        )}
      </div>
      <div className={styles.header__menu}>
        <div className={styles.header__menuButtons}>
          {menuButtons && menuButtons.map((button) => button)}
        </div>
        {profileId && (
          <div className={styles.header__profile}>
            <img
              src={require('../../assets/images/noProfilePhoto.jpg')}
              alt={user.name}
              className={styles.header__profilePhoto}
            />
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
