import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ContentHeader from '../../components/frames/ContentHeader'
import TaskInfoComponent from '../../components/teacher/TaskInfo'
import ContentHeaderLabel from '../../components/frames/ContentHeaderLabel'
import TaskAdoptStatistic from '../../components/student/TaskAdoptStatistic'

import { tasks } from '../../data/tasks'
import { files } from '../../data/files'

import styles from './TaskInfo.module.scss'

function TaskInfo({ setPageName }) {
  const taskId = +useParams().taskId

  const task = tasks.find((task) => task.id === taskId)
  const taskFiles = files.filter((file) => task.filesId.includes(file.id))

  useEffect(() => {
    setPageName(`Задание "${task.name}"`)
  }, [])

  return (
    <div className={['wrapper', styles.taskInfo].join(' ')}>
      <ContentHeader title={`Задание "${task.name}"`}></ContentHeader>

      <TaskInfoComponent task={task} taskFiles={taskFiles} />

      <ContentHeaderLabel
        title="Статистика по заданию"
        className={styles.taskInfo__labelHeader}
      />
      <TaskAdoptStatistic
        taskStatistic={task.statistic}
        questionsCount={task.questions.length}
      />
    </div>
  )
}

export default TaskInfo
