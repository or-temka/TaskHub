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

import { fetchMyUserTask } from '../../utils/fetchData/student/userTask'

import styles from './Task.module.scss'

function Task({ setPageName }) {
  const navigate = useNavigate()
  const taskId = useParams().taskId

  const [showPopUpStartTask, setShowPopUpStartTask] = useState(false)
  const [loading, setLoading] = useState(true)

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

  let taskFiles = []
  if (userTask.filesId) {
    taskFiles = files.filter((file) => userTask.filesId.includes(file.id))
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
              questionsCount={userTask.questionsCount}
            />
          </>
        )}

        <ContentHeaderLabel
          title="Статистика по заданию"
          className={styles.task__fieldHeader}
        />
        <TaskAdoptStatistic
          taskStatistic={userTask.statistic[0]}
          questionsCount={userTask.questionsCount}
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
