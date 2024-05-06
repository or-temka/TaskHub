import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ContentHeader from '../../components/frames/ContentHeader'
import SmallTaskInfo from '../../components/student/SmallTaskInfo'
import StartExecuteTaskPopUpWarning from '../../components/student/StartExecuteTaskPopUpWarning'
import SpinLoader from '../../components/UI/Loaders/SpinLoader'

import { fetchMyUserTasks } from '../../utils/fetchData/student/userTask'

import styles from './Tasks.module.scss'

const PAGE_NAME = 'Задания'

function Tasks({
  user = {},
  setUser = () => {},
  userGroup = {},
  setUserGroup = () => {},
  setPageName,
}) {
  const navigate = useNavigate()

  useEffect(() => {
    setPageName(PAGE_NAME)
  }, [])

  const [showPopUpStartTask, setShowPopUpStartTask] = useState(false)
  const [loading, setLoading] = useState(true)

  const [selectedTaskId, setSelectedTaskId] = useState()

  const [userTasks, setUserTasks] = useState([])

  useEffect(() => {
    fetchMyUserTasks()
      .then((res) => {
        setUserTasks(res)
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <div className={['wrapper', styles.tasks].join(' ')}>
        <ContentHeader title={PAGE_NAME}></ContentHeader>
        {loading ? (
          <div className="wrapper spinLoaderWrapper">
            <SpinLoader />
          </div>
        ) : (
          <div className={styles.tasks__tasks}>
            {userTasks.map((task) => (
              <SmallTaskInfo
                task={task}
                key={task._id}
                onStartTaskHandler={() => {
                  setSelectedTaskId(task.id)
                  setShowPopUpStartTask(true)
                }}
              />
            ))}
          </div>
        )}
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
