import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ContentHeader from '../../components/frames/ContentHeader'
import TaskInfoComponent from '../../components/teacher/TaskInfo'
import ContentHeaderLabel from '../../components/frames/ContentHeaderLabel'
import TaskAdoptStatistic from '../../components/student/TaskAdoptStatistic'
import SpinLoader from '../../components/UI/Loaders/SpinLoader'
import IssueTaskStudentPopUp from '../../components/teacher/PopUps/IssueTaskStudentPopUp'
import IssueTaskGroupPopUp from '../../components/teacher/PopUps/IssueTaskGroupPopUp'

import { files } from '../../data/files'
import { fetchTask } from '../../utils/fetchData/teacher/task'
import { fetchUsers } from '../../utils/fetchData/teacher/user'
import { fetchGroups } from '../../utils/fetchData/teacher/group'

import styles from './TaskInfo.module.scss'

function TaskInfo({ setPageName }) {
  const taskId = useParams().taskId

  const [showIssueTaskStudentPopUp, setShowIssueTaskStudentPopUp] =
    useState(false)
  const [showIssueTaskGroupPopUp, setShowIssueTaskGroupPopUp] = useState(false)

  const [task, setTask] = useState()
  const [taskFiles, setTaskFiles] = useState()
  const [users, setUsers] = useState([])
  const [groups, setGroups] = useState([])

  const [taskLoading, setTaskLoading] = useState(3)

  useEffect(() => {
    // Получение задания
    fetchTask(taskId)
      .then((res) => {
        setTaskFiles(files.filter((file) => res.filesId.includes(file.id)))
        setTask(res)
        setPageName(`Задание "${res.name}"`)
        setTaskLoading((prev) => prev - 1)
      })
      .catch((err) => console.log(err))
    // Получение пользователей
    fetchUsers()
      .then((res) => {
        setUsers(res)
        setTaskLoading((prev) => prev - 1)
      })
      .catch((err) => console.log(err))

    // Получение групп
    fetchGroups()
      .then((res) => {
        setGroups(res)
        setTaskLoading((prev) => prev - 1)
      })
      .catch((err) => console.log(err))
  }, [])

  if (taskLoading > 0) {
    return (
      <div className="wrapper spinLoaderWrapper">
        <SpinLoader />
      </div>
    )
  }

  return (
    <>
      <div className={['wrapper', styles.taskInfo].join(' ')}>
        <ContentHeader title={`Задание "${task.name}"`} />

        <TaskInfoComponent
          task={task}
          taskFiles={taskFiles}
          onClickIssueTaskGroup={() => setShowIssueTaskGroupPopUp(true)}
          onClickIssueTaskStudent={() => setShowIssueTaskStudentPopUp(true)}
        />

        <ContentHeaderLabel
          title="Статистика по заданию"
          className={styles.taskInfo__labelHeader}
        />
        <TaskAdoptStatistic
          taskStatistic={task.statistic}
          questionsCount={task.questions.length + task.practiceQuestions.length}
        />
      </div>

      {/* PopUp`s */}
      {showIssueTaskStudentPopUp && (
        <IssueTaskStudentPopUp
          groups={groups}
          taskId={taskId}
          onCancel={() => setShowIssueTaskStudentPopUp(false)}
        />
      )}
      {showIssueTaskGroupPopUp && (
        <IssueTaskGroupPopUp
          groups={groups}
          taskId={taskId}
          onCancel={() => setShowIssueTaskGroupPopUp(false)}
        />
      )}
    </>
  )
}

export default TaskInfo
