import { useEffect, useState } from 'react'

import PopUp from '../../UI/PopUps/PopUp'
import FrameContent from '../../frames/FrameContent'
import PopUpConfirmation from '../../UI/PopUps/PopUpConfirmation'
import PopUpNotification from '../../UI/PopUps/PopUpNotification'
import Input from '../../UI/Inputs/Input'

import {
  fetchAddGroupTask,
  fetchAddUserTask,
} from '../../../utils/fetchData/teacher/userTask'

import styles from './IssueTaskPopUp.module.scss'

function IssueTaskStudentPopUp({
  groups,
  taskId,
  onCancel = () => {},
  className,
  ...params
}) {
  const [showIssueTaskConfirmPopUp, setShowIssueTaskConfirmPopUp] =
    useState(false)
  const [showAddedNotification, setShowAddedNotification] = useState(false)

  const [searchValue, setSearchValue] = useState('')

  const [enteredGroupId, setEnteredGroupId] = useState()

  // обработка выбора пользователя для выдачи задания
  const onEnterGroupHandler = (groupId) => {
    setEnteredGroupId(groupId)
    setShowIssueTaskConfirmPopUp(true)
  }

  // Обработка закрытия (отмены) окна подтверждения выдачи задания
  const onCloseEnterGroupHandler = () => {
    setEnteredGroupId()
    setShowIssueTaskConfirmPopUp(false)
  }

  // Обработчик выдачи задания нужному пользователю
  const issueTaskHanler = () => {
    fetchAddGroupTask(enteredGroupId, taskId)
      .then((res) => {
        setEnteredGroupId()
        setShowAddedNotification(true)
      })
      .catch((err) => console.log(err))
  }

  // Обработка закрытия уведомления с успешным добавлением
  const onCloseAddedNotificationHandler = () => {
    setShowIssueTaskConfirmPopUp(false)
    setShowAddedNotification(false)
  }

  return (
    <>
      <PopUp
        {...params}
        className={[styles.issueTask, className].join(' ')}
        contentClassName={styles.issueTask__content}
        onCancel={onCancel}
        onClickBack={onCancel}
      >
        <div className={styles.issueTask__header}>
          <div className={styles.issueTask__labelHeader}>
            <span className={styles.issueTask__label}>Выберите группу:</span>
            <span className={styles.issueTask__text}>
              Всем студентам данной группы будет выдано задание
            </span>
          </div>
          <div className={styles.issueTask__search}>
            <span className={styles.issueTask__searchLabel}>Поиск:</span>
            <Input
              placeholder="Введите название группы"
              className={styles.issueTask__searchInput}
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
          </div>
        </div>

        <FrameContent
          className={styles.issueTask__frameWrapper}
          contentClassName={styles.issueTask__frameContent}
        >
          {groups
            .filter((group) =>
              group.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((group) => {
              return (
                <div
                  className={styles.issueTask__issueTargetContainer}
                  onClick={() => onEnterGroupHandler(group._id)}
                  key={group._id}
                >
                  <span className={styles.issueTask__issueTargetName}>
                    {group.name}
                  </span>
                </div>
              )
            })}
        </FrameContent>
      </PopUp>

      {showIssueTaskConfirmPopUp && (
        <PopUpConfirmation
          labelText="Вы действительно хотите выдать задание пользователям данной группы?"
          text="В будущем у вас не получится забрать или удалить данное задание у пользователей."
          onCancel={onCloseEnterGroupHandler}
          onClickBack={onCloseEnterGroupHandler}
          onConfirm={issueTaskHanler}
        />
      )}

      {showAddedNotification && (
        <PopUpNotification
          text="Задание было успешно выдано пользователям группы!"
          onCancel={onCloseAddedNotificationHandler}
        />
      )}
    </>
  )
}

export default IssueTaskStudentPopUp
