import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ContentHeader from '../../components/frames/ContentHeader'
import SmallTaskInfo from '../../components/student/SmallTaskInfo'
import StartExecuteTaskPopUpWarning from '../../components/student/StartExecuteTaskPopUpWarning'
import SpinLoader from '../../components/UI/Loaders/SpinLoader'
import { ReactComponent as BlankSVG } from '../../assets/svg/blank.svg'
import PopUpConfirmation from '../../components/UI/PopUps/PopUpConfirmation'

import { fetchMyUserTasks } from '../../utils/fetchData/student/userTask'
import { fetchStartTaskPerform } from '../../utils/fetchData/taskPerform'

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
  const [showPopUpContinueTask, setShowPopUpContinueTask] = useState(false)
  const [loading, setLoading] = useState(true)
  const [disabledStartTaskBtn, setDisabledStartTaskBtn] = useState(false)

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

  // Обработка старта задания
  const onStartTaskHandler = () => {
    setDisabledStartTaskBtn(true)
    fetchStartTaskPerform(selectedTaskId)
      .then((res) => {
        setDisabledStartTaskBtn(false)
        navigate(`taskPerform/${selectedTaskId}`, {
          relative: 'path',
        })
      })
      .catch((err) => {
        setDisabledStartTaskBtn(false)
        // Если задание уже начато
        if (err.message === 'Задание уже начато.') {
          setShowPopUpContinueTask(true)
        }
      })
  }

  return (
    <>
      <div className={['wrapper', styles.tasks].join(' ')}>
        <ContentHeader title={PAGE_NAME}></ContentHeader>
        {loading ? (
          <div className="wrapper spinLoaderWrapper">
            <SpinLoader />
          </div>
        ) : userTasks.length > 0 ? (
          <div className={styles.tasks__tasks}>
            {userTasks.map((task) => (
              <SmallTaskInfo
                task={task}
                key={task.id}
                onStartTaskHandler={() => {
                  setSelectedTaskId(task.id)
                  setShowPopUpStartTask(true)
                }}
              />
            ))}
          </div>
        ) : (
          <div className={styles.tasks__blank}>
            <BlankSVG />
            <span className={styles.tasks__blankText}>
              Вам ещё не выдали задание.
            </span>
          </div>
        )}
      </div>

      {showPopUpStartTask && (
        <StartExecuteTaskPopUpWarning
          onCancel={() => setShowPopUpStartTask(false)}
          onConfirm={onStartTaskHandler}
        />
      )}

      {showPopUpContinueTask && (
        <PopUpConfirmation
          labelText="Задание уже начато, желаете продолжить его выполнение?"
          text='Чтобы завершить задание, вам необходимо перейти к его выполнению и нажать кнопку "завершить"'
          headerLabelText="Продолжить выполнение?"
          onCancel={() => {
            setShowPopUpStartTask(false)
            setShowPopUpContinueTask(false)
          }}
          onClickBack={() => {
            setShowPopUpStartTask(false)
            setShowPopUpContinueTask(false)
          }}
          onConfirm={() => {
            navigate(`taskPerform/${selectedTaskId}`, {
              relative: 'path',
            })
          }}
        />
      )}
    </>
  )
}

export default Tasks
