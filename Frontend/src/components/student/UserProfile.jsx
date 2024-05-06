import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PopUp from '../UI/PopUps/PopUp'
import ContentContainer from '../frames/ContentContainer'
import DangerButtonWithIcon from '../UI/Buttons/DangerButtonWithIcon'
import PopUpConfirmation from '../UI/PopUps/PopUpConfirmation'
import { ReactComponent as ExitSVG } from '../../assets/svg/exit.svg'

import getTimeExecuteInfo from '../../utils/getTimeExecuteInfo'
import { removeUserToken } from '../../utils/userTokenManager'

import styles from './UserProfile.module.scss'

function UserProfile({ user, userGroupName, onCancel = () => {} }) {
  const navigate = useNavigate()
  const [showExitPopUp, setShowExitPopUp] = useState(false)

  const onExitAccoutHandler = () => {
    removeUserToken()
    localStorage.removeItem('userRole')
    setShowExitPopUp(false)
    navigate('/signIn', { relative: 'route' })
  }

  return (
    <>
      <PopUp
        className={styles.userProfile}
        contentClassName={styles.userProfile__content}
        onClickBack={onCancel}
        onCancel={onCancel}
      >
        <ContentContainer className={styles.userProfile__mainInfo}>
          <div className={styles.userProfile__info}>
            <div className={styles.userProfile__photoContainer}>
              <img
                src={require('../../assets/images/noProfilePhoto.jpg')}
                alt="Фото пользователя"
                className={styles.userProfile__photo}
              />
            </div>
            <div className={styles.userProfile__textInfo}>
              <h6 className={['h6', styles.userProfile__name].join(' ')}>
                {user.name}
              </h6>
              <div className={styles.userProfile__infoLine}>
                <span className={styles.userProfile__infoTitle}>Группа:</span>
                <span className={styles.userProfile__infoValue}>
                  {userGroupName}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.userProfile__actions}>
            <DangerButtonWithIcon
              svgElem={<ExitSVG />}
              title="Выйти из аккаунта"
              onClick={() => setShowExitPopUp(true)}
            />
          </div>
        </ContentContainer>
        <ContentContainer className={styles.userProfile__statistics}>
          <span className={styles.userProfile__infoLine}>
            <span className={styles.userProfile__infoTitle}>Средний балл:</span>
            <span className={styles.userProfile__infoValue}>
              {user.statistics.avarageMark}
            </span>
          </span>
          <span className={styles.userProfile__infoLine}>
            <span className={styles.userProfile__infoTitle}>
              Выполнено заданий:
            </span>
            <span className={styles.userProfile__infoValue}>
              {user.statistics.complitedTasks}
            </span>
          </span>
          <span className={styles.userProfile__infoLine}>
            <span className={styles.userProfile__infoTitle}>
              Среднее время выполнения задания:
            </span>
            <span className={styles.userProfile__infoValue}>
              {getTimeExecuteInfo(user.statistics.avarageTaskTime)}
            </span>
          </span>
          <span className={styles.userProfile__infoLine}>
            <span className={styles.userProfile__infoTitle}>
              Среднее время ответа на один вопрос:
            </span>
            <span className={styles.userProfile__infoValue}>
              {getTimeExecuteInfo(user.statistics.avarageQuestionTime)}
            </span>
          </span>
        </ContentContainer>
      </PopUp>
      {showExitPopUp && (
        <PopUpConfirmation
          labelText="Вы уверены, что хотите выйти?"
          text="Для повторного входа вам потребуется логин и пароль от аккаунта. В случаях утери их можно узнать у преподавателя."
          onClickBack={() => setShowExitPopUp(false)}
          onCancel={() => setShowExitPopUp(false)}
          onConfirm={() => onExitAccoutHandler()}
        />
      )}
    </>
  )
}

export default UserProfile
