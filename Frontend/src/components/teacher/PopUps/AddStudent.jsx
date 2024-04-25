import { useState } from 'react'

import PopUp from '../../UI/PopUps/PopUp'
import Input from '../../UI/Inputs/Input'
import PrimaryButton from '../../UI/Buttons/PrimaryButton'
import Button from '../../UI/Buttons/Button'
import Select from '../../UI/Inputs/Select'

import groups from '../../../data/groups'

import styles from './AddStudent.module.scss'

function AddStudent({
  onAddStudent = () => {},
  onCancel = () => {},
  className,
  ...params
}) {
  const [showNotificationPopUp, setShowNotificationPopUp] = useState(false)

  const [fio, setFio] = useState('')
  const [password, setPassword] = useState('')
  const [selectedGroup, setSelectedGroup] = useState()

  const [errorsInput, setErrorsInput] = useState({})

  const selectGroups = []
  groups.forEach((group) => {
    const studentsCount = group.studentsId.length

    const groupObj = {
      value: group.id,
      label: group.name + (studentsCount ? ` (${studentsCount})` : ''),
    }
    selectGroups.push(groupObj)
  })

  const addStudentHandler = () => {
    const errors = {}
    if (!fio) errors.inputFio = 'Укажите ФИО'
    if (!password) errors.inputPassword = 'Укажите пароль'
    if (!selectedGroup) errors.selectedGroup = 'Выберите поле'
    setErrorsInput({ ...errors })

    if (Object.keys(errors).length !== 0) return
    // Если нет ошибок
    // TODO отправка данных
    setShowNotificationPopUp(true)
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
            <span className={styles.addStudent__inputLabel}>ФИО</span>
            <Input
              placeholder="Введите ФИО"
              value={fio}
              onChange={(e) => setFio(e.target.value)}
              className={styles.addStudent__input}
              errorText={errorsInput.inputFio}
            />
          </div>
          <div className={styles.addStudent__inputLine}>
            <span className={styles.addStudent__inputLabel}>
              Пароль от аккаунта
            </span>
            <Input
              placeholder="Введите пароль от аккаунта"
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
              options={selectGroups}
              onChange={(value) => setSelectedGroup(value)}
              errorText={errorsInput.selectedGroup}
            />
          </div>
        </div>
        <div className={styles.addStudent__buttons}>
          <PrimaryButton
            title="Добавить студента"
            onClick={addStudentHandler}
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
