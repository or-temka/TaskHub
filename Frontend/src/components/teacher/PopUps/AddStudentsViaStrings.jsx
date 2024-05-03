import { useEffect, useState } from 'react'

import Button from '../../UI/Buttons/Button'
import PrimaryButton from '../../UI/Buttons/PrimaryButton'
import Input from '../../UI/Inputs/Input'
import TextArea from '../../UI/Inputs/TextArea'
import PopUp from '../../UI/PopUps/PopUp'
import ContentContainer from '../../frames/ContentContainer'
import FrameContent from '../../frames/FrameContent'

import { fetchAddManyUsers } from '../../../utils/fetchData/teacher/user'

import styles from './AddStudentsViaStrings.module.scss'

function AddStudentsViaStrings({
  onAddFile = () => {},
  onCancel = () => {},
  setNewUsers = () => {},
  setNewGroups = () => {},
  className,
  ...params
}) {
  const [showConfirmPopUp, setShowConfirmPopUp] = useState(false)
  const [showNotificationPopUp, setShowNotificationPopUp] = useState(false)

  const [wrongText, setWrongText] = useState()

  const [groupName, setGroupName] = useState('')
  const [groupCource, setGroupCource] = useState('')
  const [studentsStrings, setStudentsStrings] = useState('')

  const [students, setStudents] = useState()

  useEffect(() => {
    if (wrongText) setWrongText()
  }, [groupName, groupCource, studentsStrings])

  // Нажали добавить
  const onClickAdd = () => {
    const studentsArray = studentsStrings
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)

    if (studentsArray.length === 0) {
      return setWrongText("Поле 'Студенты' должно быть обязательно заполнено")
    }

    setStudents(studentsArray)

    setShowConfirmPopUp(true)
  }

  // Нажали подтвердить (проверили все данные)
  const onClickConfirm = () => {
    const fetchData = {
      ...(groupName && { groupName }),
      ...(groupCource && { groupCource }),
      users: students,
    }
    fetchAddManyUsers(fetchData)
      .then((res) => {
        console.log(res.data)
        if (res.data.newGroup) {
          const newGroup = res.data.newGroup
          newGroup.studentsId = [...res.data.newUsers.map((user) => user._id)]
          setNewGroups((prev) => [...prev, newGroup])
        }
        setNewUsers((prev) => [...prev, ...res.data.newUsers])
        setShowNotificationPopUp(true)
      })
      .catch((err) => {
        setShowConfirmPopUp(false)
        setWrongText(err.message)
      })
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
          {groupName && (
            <div className={styles.addStudents__inputLine}>
              <span className={styles.addStudents__inputLabel}>Курс:</span>
              <Input
                value={groupCource}
                onChange={(e) => setGroupCource(e.target.value)}
                placeholder="Введите курс группы"
              />
            </div>
          )}
          <div className={styles.addStudents__inputLine}>
            <span className={styles.addStudents__inputLabel}>Студенты:</span>
            <TextArea
              rows="15"
              value={studentsStrings}
              onChange={(e) => setStudentsStrings(e.target.value)}
              className={styles.addStudents__textArea}
            />
          </div>

          {wrongText && (
            <span className={styles.addStudents__wrongText}>{wrongText}</span>
          )}

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
          headerText="Подтверждение"
          onCancel={() => setShowConfirmPopUp(false)}
          onClickBack={() => setShowConfirmPopUp(false)}
        >
          <span className={styles.confirm__text}>
            Проверьте, все ли пользователи указаны верно.
          </span>
          <FrameContent className={styles.confirm__frame}>
            {students.map((student, index) => (
              <span key={index}>
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
