

import styles from './Header.module.css'

function Header({
  pageName = '',
  profileId = undefined, // <Number>
  menuButtons = undefined, // <Array of <>>
}) {
  return (
    <header className={styles.header}>
      <div className={styles.header__labelContainer}>
        <span className={styles.header__labelText}>USTY TaskHub</span>
        <span className={styles.header__textCircle}></span>
        <span className={styles.header__nowPageName}>{pageName}</span>
      </div>
      <div className={styles.header__menu}>
        <div className={styles.header__menuButtons}>
          {menuButtons && menuButtons.map((button) => button)}
        </div>
        {profileId && (
          <div className={styles.header__profile}>
            <img src="../../assets/images/withouPhoto.jpg" alt="Имя человека" />
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
