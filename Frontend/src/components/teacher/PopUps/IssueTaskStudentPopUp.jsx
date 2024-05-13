import { useEffect, useState } from 'react'

import PopUp from '../../UI/PopUps/PopUp'
import FrameContent from '../../frames/FrameContent'
import PopUpConfirmation from '../../UI/PopUps/PopUpConfirmation'
import PopUpNotification from '../../UI/PopUps/PopUpNotification'
import Input from '../../UI/Inputs/Input'

import { fetchUsersWithoutTask } from '../../../utils/fetchData/teacher/user'
import { fetchAddUserTask } from '../../../utils/fetchData/teacher/userTask'

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

  const [users, setUsers] = useState([])

  const [searchValue, setSearchValue] = useState('')

  const [enteredUserId, setEnteredUserId] = useState()

  // Получение и установка пользователей
  useEffect(() => {
    fetchUsersWithoutTask(taskId)
      .then((res) => setUsers(res))
      .catch((err) => console.log(err))
  }, [])

  // обработка выбора пользователя для выдачи задания
  const onEnterUserHandler = (userId) => {
    setEnteredUserId(userId)
    setShowIssueTaskConfirmPopUp(true)
  }

  // Обработка закрытия (отмены) окна подтверждения выдачи задания
  const onCloseEnterUserHandler = () => {
    setEnteredUserId()
    setShowIssueTaskConfirmPopUp(false)
  }

  // Обработчик выдачи задания нужному пользователю
  const issueTaskHanler = () => {
    fetchAddUserTask(enteredUserId, taskId)
      .then((res) => {
        setUsers((prev) => prev.filter((user) => user._id !== enteredUserId))
        setEnteredUserId()
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
            <span className={styles.issueTask__label}>Выберите студента:</span>
            <span className={styles.issueTask__text}>
              Ему будет выдано задание
            </span>
          </div>
          <div className={styles.issueTask__search}>
            <span className={styles.issueTask__searchLabel}>Поиск:</span>
            <Input
              placeholder="Введите ФИО студента"
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
          {users
            .filter((user) =>
              user.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((user) => {
              const userGroup = groups.find(
                (group) => group._id === user.groupId
              )
              let userGroupName = ''
              if (userGroup) userGroupName = userGroup.name
              return (
                <div
                  className={styles.issueTask__issueTargetContainer}
                  onClick={() => onEnterUserHandler(user._id)}
                  key={user._id}
                >
                  <span className={styles.issueTask__issueTargetName}>
                    {user.name + '  '}
                    {userGroupName && (
                      <span className={styles.issueTask__issueTargetAdoptInfo}>
                        {userGroupName}
                      </span>
                    )}
                  </span>
                </div>
              )
            })}
        </FrameContent>
      </PopUp>

      {showIssueTaskConfirmPopUp && (
        <PopUpConfirmation
          labelText="Вы действительно хотите выдать задание пользователю?"
          text="В будущем у вас не получится забрать или удалить данное задание у пользователя"
          onCancel={onCloseEnterUserHandler}
          onClickBack={onCloseEnterUserHandler}
          onConfirm={issueTaskHanler}
        />
      )}

      {showAddedNotification && (
        <PopUpNotification
          text="Задание было успешно выдано пользователю!"
          onCancel={onCloseAddedNotificationHandler}
        />
      )}
    </>
  )
}

export default IssueTaskStudentPopUp
