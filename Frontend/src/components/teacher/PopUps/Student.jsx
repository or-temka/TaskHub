import { useEffect, useState } from 'react'

import PopUp from '../../UI/PopUps/PopUp'
import ContentContainer from '../../frames/ContentContainer'
import DangerButtonWithIcon from '../../UI/Buttons/DangerButtonWithIcon'
import { ReactComponent as BinSVG } from '../../../assets/svg/bin.svg'
import ColorTextMsg from '../../UI/Texts/ColorTextMsg'
import Button from '../../UI/Buttons/Button'
import FrameContent from '../../frames/FrameContent'
import PopUpConfirmation from '../../UI/PopUps/PopUpConfirmation'
import PrimaryButton from '../../UI/Buttons/PrimaryButton'
import Input from '../../UI/Inputs/Input'
import Select from '../../UI/Inputs/Select'

import getTimeExecuteInfo from '../../../utils/getTimeExecuteInfo'

import { fetchUserTasks } from '../../../utils/fetchData/teacher/userTask'
import { fetchTasks } from '../../../utils/fetchData/teacher/task'

import styles from './Student.module.scss'
import {
  fetchAddStudentInGroup,
  fetchEditUser,
  fetchRemoveStudentFromGroup,
} from '../../../utils/fetchData/teacher/user'
import { fetchGroups } from '../../../utils/fetchData/teacher/group'

function Student({
  user,
  group,
  groups,
  setNewUsers = () => {},
  setNewGroups = () => {},
  onCancel = () => {},
  className,
  ...params
}) {
  const [showDelUserPopUpConfirm, setShowDelUserPopUpConfirm] = useState(false)
  const [showEditUserPopUp, setShowEditUserPopUp] = useState(false)
  const [showEditDoneNotification, setShowEditDoneNotification] =
    useState(false)
  const [showTaskResultPopUp, setShowTaskResultPopUp] = useState(false)

  const [disabledEditButton, setDisabledEditButton] = useState(false)

  const [userFio, setUserFio] = useState(user.name)
  const [userLogin, setUserLogin] = useState(user.login)
  const [userPassword, setUserPassword] = useState(user.password)

  const [userTasks, setUserTasks] = useState([])
  const [originalTasks, setOriginalTasks] = useState([])

  const [selectedGroup, setSelectedGroup] = useState(user.groupId || 'default')

  // //Для формы редактирования
  const openEditUserPopUp = () => {
    setUserFio(user.name)
    setUserPassword(user.password)
    setShowEditUserPopUp(true)
  }

  // Для выбора группы при редактировании студента
  const selectGroups = []
  groups.forEach((group) => {
    const studentsCount = group.studentsId.length

    const groupObj = {
      value: group._id,
      label: group.name + (studentsCount ? ` (${studentsCount})` : ''),
    }
    selectGroups.push(groupObj)
  })

  // Выборка задач пользователя
  // получение задач пользвователя
  useEffect(() => {
    fetchUserTasks(user._id)
      .then((res) => {
        setUserTasks(res)
      })
      .catch((error) => console.log(error))

    fetchTasks()
      .then((res) => {
        setOriginalTasks(res)
      })
      .catch((error) => console.log(error))
  }, [])

  // Обработка удаления пользователя
  const delUserHandler = () => {
    // TODO удаление пользователя из бд
    onCancel()
  }

  // Обработка изменения данных о пользователе
  const editUserHandler = () => {
    setDisabledEditButton(true)
    // изменение данных о пользователе на сервере
    const newUserData = {
      name: userFio,
      login: userLogin,
      password: userPassword,
    }

    // Изменение студента и его группы и самой группы
    let newUser
    fetchEditUser(user._id, newUserData)
      .then((res) => {
        newUser = res
      })
      .then(async () => {
        if (selectedGroup === 'default') {
          // Значит выбрали, что пользователь будет не в группе
          if (newUser.groupId) {
            await fetchRemoveStudentFromGroup(user._id)
            delete newUser.groupId
          }
        } else {
          await fetchAddStudentInGroup(user._id, selectedGroup)
          newUser.groupId = selectedGroup
        }

        return await fetchGroups()
      })
      .then((resGroups) => {
        setNewGroups(resGroups)
        setNewUsers((prev) =>
          [...prev].map((tempUser) =>
            tempUser._id === user._id ? newUser : tempUser
          )
        )
        setShowEditDoneNotification(true)
      })
      .catch((error) => console.log(error))
      .finally(() => setDisabledEditButton(false))
    // Изменение данных на клиенте
  }

  return (
    <>
      <PopUp
        {...params}
        className={[styles.student, className].join(' ')}
        contentClassName={styles.student__content}
        onCancel={onCancel}
        onClickBack={onCancel}
      >
        <ContentContainer className={styles.student__main}>
          <div className={styles.student__info}>
            <div className={styles.student__imgContainer}>
              <img
                className={styles.student__img}
                src={require('../../../assets/images/noProfilePhoto.jpg')}
                alt="Фото пользователя"
              />
            </div>
            <div className={styles.student__textInfo}>
              <h6 className={styles.student__studentName}>{user.name}</h6>
              <div className={styles.student__infoLine}>
                {group && (
                  <span className={styles.student__infoLabel}>
                    Группа:{' '}
                    <span className={styles.student__infoValue}>
                      {group.name}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className={styles.student__buttons}>
            <DangerButtonWithIcon
              title="Удалить студента"
              svgElem={<BinSVG />}
              onClick={() => setShowDelUserPopUpConfirm(true)}
            />
            <Button title="Редактировать" onClick={openEditUserPopUp} />
          </div>
        </ContentContainer>
        <div className={styles.student__secondInfoContainer}>
          <ContentContainer
            className={styles.student__tasks}
            wrapperClassName={styles.student__tasksWrapper}
            headerText="Выданные задания"
          >
            <FrameContent
              className={styles.student__tasksFrame}
              contentClassName={styles.student__tasksFrameContent}
            >
              {userTasks.map((task) => {
                const originalTask = originalTasks.find(
                  (originalTask) => originalTask._id === task.originalTaskId
                )
                if (!originalTask) return
                return (
                  <div key={task.id} className={styles.task}>
                    <div className={styles.task__header}>
                      <span className={styles.task__name}>
                        Задание "{originalTask.name}"
                      </span>
                      <ColorTextMsg
                        msgType={task.newTask ? 'warning' : 'success'}
                      >
                        {task.newTask ? 'Выдано' : 'Выполнено'}
                      </ColorTextMsg>
                    </div>

                    <div className={styles.task__info}>
                      <span className={styles.student__infoLabel}>
                        Осталось попыток:{' '}
                        <span className={styles.student__infoValue}>
                          {task.attemptsCount}
                        </span>
                      </span>
                      {task.mark && (
                        <span className={styles.student__infoLabel}>
                          Оценка:{' '}
                          <span className={styles.student__infoValue}>
                            {task.mark}
                          </span>
                        </span>
                      )}
                    </div>
                    <div className={styles.task__buttons}>
                      {task.mark && (
                        <Button
                          title="Результаты"
                          onClick={() => setShowTaskResultPopUp(task.id)}
                        />
                      )}
                      <Button title="+ Выдать ещё попытку" onClick={() => {}} />
                    </div>
                  </div>
                )
              })}
            </FrameContent>
          </ContentContainer>
          <ContentContainer
            className={styles.student__statistics}
            wrapperClassName={styles.student__statisticsWrapper}
            headerText="Статистика студента"
          >
            {user.statistics.complitedTasks > 0 ? (
              <>
                <div className={styles.student__infoLine}>
                  <span className={styles.student__infoLabel}>
                    Средний балл:{' '}
                    <span className={styles.student__infoValue}>
                      {user.statistics.avarageMark}
                    </span>
                  </span>
                </div>
                <div className={styles.student__infoLine}>
                  <span className={styles.student__infoLabel}>
                    Выполненно заданий:{' '}
                    <span className={styles.student__infoValue}>
                      {user.statistics.complitedTasks}
                    </span>
                  </span>
                </div>
                <div className={styles.student__infoLine}>
                  <span className={styles.student__infoLabel}>
                    Среднее время выполнения задания:{' '}
                    <span className={styles.student__infoValue}>
                      {user.statistics.avarageTaskTime
                        ? getTimeExecuteInfo(user.statistics.avarageTaskTime)
                        : user.statistics.avarageTaskTime}
                    </span>
                  </span>
                </div>
                <div className={styles.student__infoLine}>
                  <span className={styles.student__infoLabel}>
                    Среднее время ответа на один вопрос:{' '}
                    <span className={styles.student__infoValue}>
                      {user.statistics.avarageQuestionTime
                        ? getTimeExecuteInfo(
                            user.statistics.avarageQuestionTime
                          )
                        : user.statistics.avarageQuestionTime}
                    </span>
                  </span>
                </div>
              </>
            ) : (
              <span className={styles.student__infoLabel}>
                Пользователь ещё не выполнил ни одного задания.
              </span>
            )}
          </ContentContainer>
        </div>
      </PopUp>

      {/* PopUp`s */}
      {showDelUserPopUpConfirm && (
        <PopUpConfirmation
          labelText="Вы действительно хотите удалить пользователя?"
          text="После удаления пользователя вернуть не получится."
          onCancel={() => setShowDelUserPopUpConfirm(false)}
          onClickBack={() => setShowDelUserPopUpConfirm(false)}
          onConfirm={delUserHandler}
        />
      )}

      {showEditUserPopUp && (
        <PopUp
          headerText="Редактирование пользователя"
          className={styles.editStudent}
          contentClassName={styles.editStudent__content}
          onCancel={() => setShowEditUserPopUp(false)}
        >
          <div className={styles.editStudent__inputs}>
            <div className={styles.editStudent__inputLine}>
              <span className={styles.editStudent__inputTitle}>ФИО:</span>
              <Input
                placeholder="Введите ФИО"
                value={userFio}
                onChange={(e) => setUserFio(e.target.value)}
              />
            </div>
            <div className={styles.editStudent__inputLine}>
              <span className={styles.editStudent__inputTitle}>Логин:</span>
              <Input
                placeholder="Введите логин от аккаунта"
                value={userLogin}
                onChange={(e) => setUserLogin(e.target.value)}
              />
            </div>
            <div className={styles.editStudent__inputLine}>
              <span className={styles.editStudent__inputTitle}>Пароль:</span>
              <Input
                placeholder="Введите пароль от аккаунта"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </div>
            <div className={styles.editStudent__inputLine}>
              <span className={styles.editStudent__inputTitle}>
                Выберите группу:
              </span>
              <Select
                placeholder="Нет группы"
                options={selectGroups}
                onChange={(value) => setSelectedGroup(value)}
                defaultValue={user.groupId}
                notEnteredColor="red"
              />
            </div>
          </div>
          <div className={styles.editStudent__buttons}>
            <PrimaryButton
              title="Сохранить изменения"
              onClick={editUserHandler}
              loading={disabledEditButton}
            />
            <Button
              title="Отмена"
              onClick={() => setShowEditUserPopUp(false)}
            />
          </div>
        </PopUp>
      )}

      {showEditDoneNotification && (
        <PopUp
          headerText="Уведомление"
          onClickBack={() => onCancel()}
          onCancel={() => onCancel()}
        >
          <span>Пользователь успешно отредактирован!</span>
        </PopUp>
      )}

      {showTaskResultPopUp &&
        (() => {
          const userTask = userTasks.find(
            (task) => task.id === showTaskResultPopUp
          )
          return (
            <PopUp
              headerText="Результаты задания"
              onClickBack={() => setShowTaskResultPopUp(false)}
              onCancel={() => setShowTaskResultPopUp(false)}
            >
              <div className={styles.student__infoLine}>
                <span className={styles.student__infoLabel}>
                  Время выполнения задания:{' '}
                  <span className={styles.student__infoValue}>
                    {getTimeExecuteInfo(userTask.statistics.taskRuntime)}
                  </span>
                </span>
              </div>
              <div className={styles.student__infoLine}>
                <span className={styles.student__infoLabel}>
                  Оценка за задание:{' '}
                  <span className={styles.student__infoValue}>
                    {`${userTask.notRoundMark} -> ${userTask.mark}`}
                  </span>
                </span>
              </div>
            </PopUp>
          )
        })()}
    </>
  )
}

export default Student
