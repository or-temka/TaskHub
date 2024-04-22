import { useEffect } from 'react'

import ContentHeader from '../../components/frames/ContentHeader'
import Tasks from '../../components/teacher/Tasks'

import { tasks } from '../../data/tasks'

import styles from './Tasks.module.scss'

function TeacherTasks({ setPageName }) {
  useEffect(() => {
    setPageName('Задания')
  }, [])

  return (
    <div className={['wrapper', styles.tasks].join(' ')}>
      <ContentHeader title="Задания"></ContentHeader>

      <Tasks tasks={tasks} />
    </div>
  )
}

export default TeacherTasks
