import { useEffect, useState } from 'react'

import ContentHeader from '../../components/frames/ContentHeader'
import Tasks from '../../components/teacher/Tasks'

import styles from './Tasks.module.scss'
import { fetchTasks } from '../../utils/fetchData/teacher/task'
import SpinLoader from '../../components/UI/Loaders/SpinLoader'

function TeacherTasks({ setPageName }) {
  const [tasksLoading, setTasksLoading] = useState(true)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    setPageName('Задания')
  }, [])

  // Получение заданий
  useEffect(() => {
    fetchTasks().then((res) => {
      setTasks(res)
      setTasksLoading(false)
    })
  }, [])

  if (tasksLoading) {
    return (
      <div className="wrapper spinLoaderWrapper">
        <SpinLoader />
      </div>
    )
  }

  return (
    <div className={['wrapper', styles.tasks].join(' ')}>
      <ContentHeader title="Задания"></ContentHeader>

      <Tasks tasks={tasks} />
    </div>
  )
}

export default TeacherTasks
