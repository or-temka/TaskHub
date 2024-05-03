import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ContentHeader from '../../components/frames/ContentHeader'
import TaskInfoComponent from '../../components/teacher/TaskInfo'
import ContentHeaderLabel from '../../components/frames/ContentHeaderLabel'
import TaskAdoptStatistic from '../../components/student/TaskAdoptStatistic'
import SpinLoader from '../../components/UI/Loaders/SpinLoader'

import { files } from '../../data/files'
import { fetchTask } from '../../utils/fetchData/teacher/task'

import styles from './TaskInfo.module.scss'

function TaskInfo({ setPageName }) {
  const taskId = useParams().taskId

  const [task, setTask] = useState()
  const [taskFiles, setTaskFiles] = useState()

  const [taskLoading, setTaskLoading] = useState(true)

  // Получение задания
  useEffect(() => {
    fetchTask(taskId)
      .then((res) => {
        setTaskFiles(files.filter((file) => res.filesId.includes(file.id)))
        setTask(res)
        setPageName(`Задание "${res.name}"`)
        setTaskLoading(false)
      })
      .catch((err) => console.log(err))
  }, [])

  if (taskLoading) {
    return (
      <div className="wrapper spinLoaderWrapper">
        <SpinLoader />
      </div>
    )
  }

  return (
    <div className={['wrapper', styles.taskInfo].join(' ')}>
      <ContentHeader title={`Задание "${task.name}"`} />

      <TaskInfoComponent task={task} taskFiles={taskFiles} />

      <ContentHeaderLabel
        title="Статистика по заданию"
        className={styles.taskInfo__labelHeader}
      />
      <TaskAdoptStatistic
        taskStatistic={task.statistic[0]}
        questionsCount={task.questions.length}
      />
    </div>
  )
}

export default TaskInfo
