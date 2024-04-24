import { useState } from 'react'

import PopUp from '../../UI/PopUps/PopUp'
import ContentContainer from '../../frames/ContentContainer'
import FrameContent from '../../frames/FrameContent'
import DangerButtonWithIcon from '../../UI/Buttons/DangerButtonWithIcon'
import Button from '../../UI/Buttons/Button'
import { ReactComponent as BinSVG } from '../../../assets/svg/bin.svg'
import PopUpConfirmation from '../../UI/PopUps/PopUpConfirmation'

import styles from './Group.module.scss'

function Group({ group, users, onCancel = () => {}, className, ...params }) {
  const [showDelUserPopUpConfirm, setShowDelUserPopUpConfirm] = useState(false)
  const [showDelGroupPopUpConfirm, setShowDelGroupPopUpConfirm] =
    useState(false)

  const usersGroup = users.filter((user) => group.studentsId.includes(user.id))

  const delUserFromGroupHandler = () => {
    const userId = showDelUserPopUpConfirm
    // TODO удаление пользователя из группы
    setShowDelUserPopUpConfirm(false)
  }

  const delGroupHandler = () => {
    const groupId = group.id
    // TODO удаление группы
    onCancel()
  }

  return (
    <>
      <PopUp
        {...params}
        onCancel={onCancel}
        onClickBack={onCancel}
        contentClassName={[styles.group, className].join(' ')}
        className={styles.group__wrapper}
      >
        <ContentContainer className={styles.group__main}>
          <div className={styles.group__info}>
            <h6 className={styles.group__name}>{group.name}</h6>
            <div className={styles.group__ads}>
              <div className={styles.group__infoLine}>
                <span className={styles.group__infoLabel}>Курс:</span>
                <span className={styles.group__infoValue}>{group.cource}</span>
              </div>
              <div className={styles.group__infoLine}>
                <span className={styles.group__infoLabel}>Студентов:</span>
                <span className={styles.group__infoValue}>
                  {group.studentsId.length}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.group__buttons}>
            <DangerButtonWithIcon
              title="Удалить группу"
              svgElem={<BinSVG />}
              onClick={() => setShowDelGroupPopUpConfirm(true)}
            />
            <Button title="Редактировать" onClick={() => {}} />
          </div>
        </ContentContainer>
        <ContentContainer
          headerText="Студенты группы"
          className={styles.group__studentsContainer}
        >
          <FrameContent
            className={styles.group__studentsWrapper}
            contentClassName={styles.group__students}
          >
            {usersGroup.map((user) => (
              <div className={styles.group__student}>
                <span className={styles.group__studentName}>{user.name}</span>
                <span
                  className={styles.group__delStudentButton}
                  onClick={() => setShowDelUserPopUpConfirm(user.id)}
                >
                  Удалить из группы
                </span>
              </div>
            ))}
          </FrameContent>
        </ContentContainer>
      </PopUp>

      {/* PopUp`s */}
      {showDelUserPopUpConfirm && (
        <PopUpConfirmation
          onCancel={() => setShowDelUserPopUpConfirm(false)}
          onClickBack={() => setShowDelUserPopUpConfirm(false)}
          labelText="Вы действительно хотите удалить данного пользователя из группы?"
          text={`Студент "${
            users.find((user) => user.id === showDelUserPopUpConfirm).name
          }" будет удален из группы "${
            group.name
          }". Вы в любой момент можете добавить его обратно в группу.`}
          onConfirm={delUserFromGroupHandler}
        />
      )}
      {showDelGroupPopUpConfirm && (
        <PopUpConfirmation
          onCancel={() => setShowDelGroupPopUpConfirm(false)}
          onClickBack={() => setShowDelGroupPopUpConfirm(false)}
          labelText={`Вы действительно хотите удалить группу "${group.name}"?`}
          text="Восстановить её не получится."
          onConfirm={delGroupHandler}
        />
      )}
    </>
  )
}

export default Group
