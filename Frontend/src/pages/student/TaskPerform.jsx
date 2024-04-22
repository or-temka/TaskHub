import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import TaskPerformHeader from '../../components/student/TaskPerformHeader'
import ContentHeader from '../../components/frames/ContentHeader'

import { userTasks } from '../../data/userTasks'
import { tasks } from '../../data/tasks'

function TaskPerform({ setPageName }) {
  const taskId = +useParams().taskId

  useEffect(() => {
    setPageName('Выполнение задания')
  }, [])

  const task = userTasks.find((task) => task.id === taskId)
  const originalTask = tasks.find(
    (originalTask) => originalTask.id === task.originalTaskId
  )

  useEffect(() => {
    setPageName(`Выполнение задания "${originalTask.name}"`)
  }, [])

  return (
    <>
      <div className={'wrapper'}>
        <ContentHeader
          title={`Выполнение задания "${originalTask.name}"`}
        ></ContentHeader>
        <TaskPerformHeader task={task} originalTask={originalTask} />
      </div>
    </>
  )
}

export default TaskPerform
