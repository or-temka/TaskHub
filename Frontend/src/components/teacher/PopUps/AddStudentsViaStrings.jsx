import { useState } from 'react'
import Button from '../../UI/Buttons/Button'
import PrimaryButton from '../../UI/Buttons/PrimaryButton'
import Input from '../../UI/Inputs/Input'
import TextArea from '../../UI/Inputs/TextArea'
import PopUp from '../../UI/PopUps/PopUp'
import ContentContainer from '../../frames/ContentContainer'
import FrameContent from '../../frames/FrameContent'

import styles from './AddStudentsViaStrings.module.scss'

function AddStudentsViaStrings({
  onAddFile = () => {},
  onCancel = () => {},
  className,
  ...params
}) {
  const [showConfirmPopUp, setShowConfirmPopUp] = useState(false)
  const [showNotificationPopUp, setShowNotificationPopUp] = useState(false)

  const [groupName, setGroupName] = useState('')
  const [studentsStrings, setStudentsStrings] = useState('')

  const [students, setStudents] = useState()

  // Нажали добавить
  const onClickAdd = () => {
    setStudents(
      studentsStrings
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
    )

    setShowConfirmPopUp(true)
  }

  // Нажали подтвердить (проверили все данные)
  const onClickConfirm = () => {
    // TODO отправка данных на сервер
    setShowNotificationPopUp(true)
  }

  const onCloseNotification = () => {
    onCancel()
  }

  return (
    <>
      <PopUp
        {...params}
        contentClassName={[styles.addStudents, className].join(' ')}
        className={styles.addStudents__wrapper}
        onCancel={onCancel}
        onClickBack={onCancel}
      >
        <ContentContainer className={styles.addStudents__content}>
          <div className={styles.addStudents__inputLine}>
            <span className={styles.addStudents__inputLabel}>
              Название группы:
            </span>
            <Input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Введите название группы"
            />
          </div>
          <div className={styles.addStudents__inputLine}>
            <span className={styles.addStudents__inputLabel}>Студенты:</span>
            <TextArea
              rows="15"
              value={studentsStrings}
              onChange={(e) => setStudentsStrings(e.target.value)}
            />
          </div>
          <div className={styles.addStudents__buttons}>
            <PrimaryButton title="Добавить" onClick={onClickAdd} />
            <Button title="Отмена" onClick={onCancel} />
          </div>
        </ContentContainer>
      </PopUp>

      {/* Подтверждение */}
      {showConfirmPopUp && (
        <PopUp
          contentClassName={styles.confirm}
          confirmBtnText="Подтвердить"
          headerText="Подтверждение"
          onCancel={() => setShowConfirmPopUp(false)}
          onClickBack={() => setShowConfirmPopUp(false)}
        >
          <span className={styles.confirm__text}>
            Проверьте, все ли пользователи указаны верно.
          </span>
          <FrameContent className={styles.confirm__frame}>
            {students.map((student, index) => (
              <span>
                {index + 1}. "{student}"
              </span>
            ))}
          </FrameContent>
          <div className={styles.confirm__buttons}>
            <PrimaryButton title="Подтвердить" onClick={onClickConfirm} />
            <Button title="Отмена" onClick={() => setShowConfirmPopUp(false)} />
          </div>
        </PopUp>
      )}

      {/* Уведомление о том, что данные были отправлены */}
      {showNotificationPopUp && (
        <PopUp
          headerText="Уведомление"
          onCancel={onCloseNotification}
          onClickBack={onCloseNotification}
        >
          <span>Пользователи были успешно добавлены!</span>
        </PopUp>
      )}
    </>
  )
}

export default AddStudentsViaStrings
