import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ContentHeader from '../../components/frames/ContentHeader'
import SmallTaskInfo from '../../components/student/SmallTaskInfo'
import StartExecuteTaskPopUpWarning from '../../components/student/StartExecuteTaskPopUpWarning'

import { userTasks } from '../../data/userTasks'
import { tasks } from '../../data/tasks'

import styles from './Tasks.module.scss'

const PAGE_NAME = 'Задания'

function Tasks({ setPageName }) {
  const navigate = useNavigate()

  useEffect(() => {
    setPageName(PAGE_NAME)
  }, [])

  const [showPopUpStartTask, setShowPopUpStartTask] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState()

  return (
    <>
      <div className={['wrapper', styles.tasks].join(' ')}>
        <ContentHeader title={PAGE_NAME}></ContentHeader>
        <div className={styles.tasks__tasks}>
          {userTasks.map((task) => {
            const taskInfo = tasks.find(
              (originalTask) => originalTask.id === task.originalTaskId
            )
            return (
              <SmallTaskInfo
                task={task}
                originalTask={taskInfo}
                key={task.id}
                onStartTaskHandler={() => {
                  setSelectedTaskId(task.id)
                  setShowPopUpStartTask(true)
                }}
              />
            )
          })}
        </div>
      </div>
      {showPopUpStartTask && (
        <StartExecuteTaskPopUpWarning
          onCancel={() => setShowPopUpStartTask(false)}
          onConfirm={() =>
            navigate(`taskPerform/${selectedTaskId}`, {
              relative: 'path',
            })
          }
        />
      )}
    </>
  )
}

export default Tasks
