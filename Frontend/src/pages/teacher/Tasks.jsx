import { useEffect } from 'react'

import styles from './Tasks.module.scss'

function TeacherTasks({ setPageName }) {
  useEffect(() => {
    setPageName('Задания')
  }, [])

  return <div>

  </div>
}

export default TeacherTasks
