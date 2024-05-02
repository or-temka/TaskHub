import { useEffect, useState } from 'react'

import PopUp from '../../UI/PopUps/PopUp'
import Input from '../../UI/Inputs/Input'
import PrimaryButton from '../../UI/Buttons/PrimaryButton'
import Button from '../../UI/Buttons/Button'
import Select from '../../UI/Inputs/Select'

import { fetchAddUser } from '../../../utils/fetchData/teacher/user'
import { fetchGroups } from '../../../utils/fetchData/teacher/group'

import transliterateFioToLogin from '../../../utils/transliterateFioToLogin'

import styles from './AddStudent.module.scss'

function AddStudent({
  groups,
  onAddStudent = () => {},
  onCancel = () => {},
  setNewUsers = () => {},
  setNewGroups = () => {},
  className,
  ...params
}) {
  const [showNotificationPopUp, setShowNotificationPopUp] = useState(false)
  const [disabledButton, setDisabledButton] = useState(false)
  const [showWrongText, setShowWrongText] = useState(false)

  const [fio, setFio] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [selectedGroup, setSelectedGroup] = useState()

  const [errorsInput, setErrorsInput] = useState({})

  useEffect(() => {
    setLogin(transliterateFioToLogin(fio))
  }, [fio])

  const selectGroups = []
  groups.forEach((group) => {
    const studentsCount = group.studentsId.length

    const groupObj = {
      value: group._id,
      label: group.name + (studentsCount ? ` (${studentsCount})` : ''),
    }
    selectGroups.push(groupObj)
  })

  const addStudentHandler = () => {
    setDisabledButton(true)
    const errors = {}
    if (!fio) errors.inputFio = 'Укажите ФИО'
    if (!login) errors.inputLogin = 'Укажите логин'
    setErrorsInput({ ...errors })

    if (Object.keys(errors).length !== 0) return setDisabledButton(false)
    // Если нет ошибок
    const newUserData = {
      name: fio,
      login,
      ...(password && { password }),
    }
    if (selectedGroup && selectedGroup !== 'default')
      newUserData.groupId = selectedGroup
    fetchAddUser(newUserData)
      .then((user) => {
        setShowNotificationPopUp(true)
        setNewUsers((prev) => [...prev, user.data])
        return fetchGroups()
      })
      .then((groups) => setNewGroups(groups))
      .catch((error) => {
        setShowWrongText(error.message)
      })
      .finally(() => setDisabledButton(false))
  }

  const closeNotificationPopUp = () => {
    onAddStudent()
  }

  return (
    <>
      <PopUp
        {...params}
        headerText="Добавление студента"
        contentClassName={[styles.addStudent, className].join(' ')}
        onCancel={onCancel}
      >
        <div className={styles.addStudent__content}>
          <div className={styles.addStudent__inputLine}>
            <span className={styles.addStudent__inputLabel}>ФИО *</span>
            <Input
              placeholder="Введите ФИО"
              value={fio}
              onChange={(e) => setFio(e.target.value)}
              className={styles.addStudent__input}
              errorText={errorsInput.inputFio}
            />
          </div>
          <div className={styles.addStudent__inputLine}>
            <span className={styles.addStudent__inputLabel}>Логин *</span>
            <Input
              placeholder="Введите логин"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className={styles.addStudent__input}
              errorText={errorsInput.inputLogin}
            />
          </div>
          <div className={styles.addStudent__inputLine}>
            <span className={styles.addStudent__inputLabel}>Пароль</span>
            <Input
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.addStudent__input}
              errorText={errorsInput.inputPassword}
            />
          </div>
          <div className={styles.addStudent__inputLine}>
            <span className={styles.addStudent__inputLabel}>
              Выберите группу
            </span>
            <Select
              placeholder="Нет группы"
              options={selectGroups}
              onChange={(value) => setSelectedGroup(value)}
              errorText={errorsInput.selectedGroup}
              notEnteredColor="red"
            />
          </div>
          <span className={styles.addStudent__inputLabel}>
            Если не указывать пароль, он сгенерируется сервером автоматически
          </span>
          {showWrongText && (
            <span className={styles.addStudent__wrongText}>
              {showWrongText}
            </span>
          )}
        </div>
        <div className={styles.addStudent__buttons}>
          <PrimaryButton
            title="Добавить студента"
            onClick={addStudentHandler}
            loading={disabledButton}
          />
          <Button title="Отмена" onClick={onCancel} />
        </div>
      </PopUp>

      {/* Уведомление об успешной отправке данных */}
      {showNotificationPopUp && (
        <PopUp
          headerText="Уведомление"
          onCancel={closeNotificationPopUp}
          onClickBack={closeNotificationPopUp}
        >
          <span>Пользователь был успешно добавлен!</span>
        </PopUp>
      )}
    </>
  )
}

export default AddStudent
