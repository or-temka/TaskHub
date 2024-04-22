import { Link, useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import styles from './Header.module.scss'

function Header({
  pageName = '',
  menuButtons, // <Array of <>>
  onClickProfileButton = () => {},
  user,
}) {
  const nowPageLocation = useLocation().pathname

  return (
    <header className={styles.header}>
      <div className={styles.header__labelContainer}>
        <Link to="/" className={styles.header__labelText}>
          <span className={styles.header__labelDlc}>USTY </span>TaskHub
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
          {menuButtons &&
            menuButtons.map((button) => {
              return <div key={uuidv4()}>{button}</div>
            })}
        </div>
        {user && (
          <div
            className={styles.header__profile}
            onClick={onClickProfileButton}
          >
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
