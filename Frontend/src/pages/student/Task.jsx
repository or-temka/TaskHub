import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import ContentHeader from '../../components/frames/ContentHeader'
import ContentHeaderLabel from '../../components/frames/ContentHeaderLabel'
import TaskInfo from '../../components/student/TaskInfo'
import TaskAdoptStatistic from '../../components/student/TaskAdoptStatistic'
import MyTaskStatistics from '../../components/student/MyTaskStatistics'
import StartExecuteTaskPopUpWarning from '../../components/student/StartExecuteTaskPopUpWarning'

import { userTasks } from '../../data/userTasks'
import { tasks } from '../../data/tasks'
import { files } from '../../data/files'

import styles from './Task.module.scss'

function Task({ setPageName }) {
  const navigate = useNavigate()
  const taskId = +useParams().taskId
  const userTask = userTasks.find((task) => task.id === taskId)

  useEffect(() => {
    setPageName('Задание')
  }, [])

  const [showPopUpStartTask, setShowPopUpStartTask] = useState(false)

  // Перенаправление, если нет такого задания
  useEffect(() => {
    if (!userTask) {
      navigate('../..', { relative: 'path' })
    }
  }, [userTask, navigate])
  if (!userTask) {
    return
  }

  const taskInfo = tasks.find((task) => task.id === userTask.originalTaskId)
  const taskFiles = files.filter((file) => taskInfo.filesId.includes(file.id))

  return (
    <>
      <div className={['wrapper', styles.task].join(' ')}>
        <ContentHeader title="Задание"></ContentHeader>

        <TaskInfo
          task={userTask}
          originalTask={taskInfo}
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
              questionsCount={taskInfo.questions.length}
            />
          </>
        )}

        <ContentHeaderLabel
          title="Статистика по заданию"
          className={styles.task__fieldHeader}
        />
        <TaskAdoptStatistic
          taskStatistic={taskInfo.statistic}
          questionsCount={taskInfo.questions.length}
        />
      </div>
      {showPopUpStartTask && (
        <StartExecuteTaskPopUpWarning
          onCancel={() => setShowPopUpStartTask(false)}
          onConfirm={() =>
            navigate(`../../taskPerform/${taskId}`, { relative: 'path' })
          }
        />
      )}
    </>
  )
}

export default Task
