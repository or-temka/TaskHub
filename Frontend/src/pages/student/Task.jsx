import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import ContentHeader from '../../components/frames/ContentHeader'
import ContentHeaderLabel from '../../components/frames/ContentHeaderLabel'
import TaskInfo from '../../components/student/TaskInfo'
import TaskAdoptStatistic from '../../components/student/TaskAdoptStatistic'
import MyTaskStatistics from '../../components/student/MyTaskStatistics'
import StartExecuteTaskPopUpWarning from '../../components/student/StartExecuteTaskPopUpWarning'
import SpinLoader from '../../components/UI/Loaders/SpinLoader'

import { files } from '../../data/files'

import {
  fetchMyUserTask,
  fetchMarkUserTaskAsNotNew,
} from '../../utils/fetchData/student/userTask'
import { fetchStartTaskPerform } from '../../utils/fetchData/taskPerform'

import styles from './Task.module.scss'
import PopUpConfirmation from '../../components/UI/PopUps/PopUpConfirmation'

function Task({ setPageName }) {
  const navigate = useNavigate()
  const taskId = useParams().taskId

  const [showPopUpStartTask, setShowPopUpStartTask] = useState(false)
  const [showPopUpContinueTask, setShowPopUpContinueTask] = useState(false)
  const [loading, setLoading] = useState(true)
  const [disabledStartTaskBtn, setDisabledStartTaskBtn] = useState(false)

  const [userTask, setUserTask] = useState()

  useEffect(() => {
    setPageName('Задание')

    fetchMyUserTask(taskId)
      .then((res) => {
        setUserTask(res)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        navigate('../..', { relative: 'path' })
      })
  }, [])

  if (loading) {
    return (
      <div className="wrapper spinLoaderWrapper">
        <SpinLoader />
      </div>
    )
  }

  // Назначение, что задание не новое, если оно просмотрено
  if (userTask.newTask) {
    fetchMarkUserTaskAsNotNew(userTask.id).catch((err) => console.log(err))
  }

  // Получение файлов задания
  let taskFiles = []
  if (userTask.filesId) {
    taskFiles = files.filter((file) => userTask.filesId.includes(file.id))
  }

  // Обработчик нажатия кнопки "начать задание"
  const onStartTaskPerformHandler = () => {
    setDisabledStartTaskBtn(true)
    fetchStartTaskPerform(taskId)
      .then((res) => {
        {
          setDisabledStartTaskBtn(false)
          navigate(`../../taskPerform/${taskId}`, { relative: 'path' })
        }
      })
      .catch((err) => {
        setDisabledStartTaskBtn(false)
        // Если задание уже начато
        if (err.message === 'Задание уже начато.') {
          setShowPopUpContinueTask(true)
        }
      })
  }

  return (
    <>
      <div className={['wrapper', styles.task].join(' ')}>
        <ContentHeader title="Задание"></ContentHeader>

        <TaskInfo
          task={userTask}
          taskFiles={taskFiles}
          onStartTaskHandler={() => setShowPopUpStartTask(true)}
        />

        {userTask.mark && (
          <>
            <ContentHeaderLabel
              title="Мои результаты и статистика по заданию"
              className={styles.task__fieldHeader}
            />
            <MyTaskStatistics
              userTask={userTask}
              questionsCount={
                userTask.questionsCount + userTask.practiceQuestionsCount
              }
            />
          </>
        )}

        <ContentHeaderLabel
          title="Статистика по заданию"
          className={styles.task__fieldHeader}
        />
        <TaskAdoptStatistic
          taskStatistic={userTask.statistic}
          questionsCount={
            userTask.questionsCount + userTask.practiceQuestionsCount
          }
        />
      </div>

      {showPopUpStartTask && (
        <StartExecuteTaskPopUpWarning
          disabledConfirmBtn={disabledStartTaskBtn}
          onCancel={() => setShowPopUpStartTask(false)}
          onConfirm={onStartTaskPerformHandler}
        />
      )}

      {showPopUpContinueTask && (
        <PopUpConfirmation
          labelText="Задание уже начато, желаете продолжить его выполнение?"
          text='Чтобы завершить задание, вам необходимо перейти к его выполнению и нажать кнопку "завершить"'
          headerLabelText="Продолжить выполнение?"
          onCancel={() => {
            setShowPopUpStartTask(false)
            setShowPopUpContinueTask(false)
          }}
          onClickBack={() => {
            setShowPopUpStartTask(false)
            setShowPopUpContinueTask(false)
          }}
          onConfirm={() => {
            navigate(`../../taskPerform/${taskId}`, {
              relative: 'path',
            })
          }}
        />
      )}
    </>
  )
}

export default Task
