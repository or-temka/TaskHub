import { useState } from 'react'

import PopUp from '../../UI/PopUps/PopUp'
import Input from '../../UI/Inputs/Input'
import PrimaryButton from '../../UI/Buttons/PrimaryButton'
import Button from '../../UI/Buttons/Button'

import { fetchAddGroup } from '../../../utils/fetchData/teacher/group'

import styles from './AddGroup.module.scss'

function AddGroup({
  onAddGroup = () => {},
  onCancel = () => {},
  setNewGroups = () => {},
  className,
  ...params
}) {
  const [showNotificationPopUp, setShowNotificationPopUp] = useState(false)
  const [disabledButton, setDisabledButton] = useState(false)
  const [showWrongText, setShowWrongText] = useState(false)

  const [groupName, setGroupName] = useState('')
  const [cource, setCource] = useState('')

  const [errorsInput, setErrorsInput] = useState({})

  const addGroupHandler = () => {
    setDisabledButton(true)
    const errors = {}
    if (!groupName) errors.inputGroupName = 'Укажите название группы'
    if (!cource) errors.inputCource = 'Укажите курс для группы'
    setErrorsInput({ ...errors })

    if (Object.keys(errors).length !== 0) return setDisabledButton(false)
    // Если нет ошибок
    fetchAddGroup(groupName, cource)
      .then((group) => {
        setShowNotificationPopUp(true)
        setNewGroups((prevValue) => [...prevValue, group.data])
        setDisabledButton(false)
      })
      .catch((error) => {
        setShowWrongText(error.message)
        setDisabledButton(false)
      })
  }

  const closeNotificationPopUp = () => {
    onAddGroup()
  }

  return (
    <>
      <PopUp
        {...params}
        headerText="Добавление группы"
        contentClassName={[styles.addGroup, className].join(' ')}
        onCancel={onCancel}
      >
        <div className={styles.addGroup__content}>
          <div className={styles.addGroup__inputLine}>
            <span className={styles.addGroup__inputLabel}>Название группы</span>
            <Input
              placeholder="Введите название группы"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className={styles.addGroup__input}
              errorText={errorsInput.inputGroupName}
            />
          </div>
          <div className={styles.addGroup__inputLine}>
            <span className={styles.addGroup__inputLabel}>Курс</span>
            <Input
              placeholder="Введите курс"
              value={cource}
              onChange={(e) => setCource(e.target.value)}
              className={styles.addGroup__input}
              errorText={errorsInput.inputCource}
            />
          </div>
          {showWrongText && (
            <span className={styles.addGroup__wrongText}>{showWrongText}</span>
          )}
        </div>
        <div className={styles.addGroup__buttons}>
          <PrimaryButton
            title="Добавить группу"
            onClick={addGroupHandler}
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
          <span>Группа была успешно добавлена!</span>
        </PopUp>
      )}
    </>
  )
}

export default AddGroup
