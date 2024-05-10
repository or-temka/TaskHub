import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import TaskPerformHeader from '../../components/student/TaskPerformHeader'
import ContentHeader from '../../components/frames/ContentHeader'
import ContentHeaderLabel from '../../components/frames/ContentHeaderLabel'
import Questions from '../../components/student/Questions'
import PracticeQuestions from '../../components/student/PracticeQuestions'
import PrimaryButton from '../../components/UI/Buttons/PrimaryButton'
import AnswersTableOfQuestions from '../../components/student/AnswersTableOfQuestions'
import PopUp from '../../components/UI/PopUps/PopUp'
import InfoForPracticeQuestions from '../../components/student/InfoForPracticeQuestions'
import SpinLoader from '../../components/UI/Loaders/SpinLoader'
import Button from '../../components/UI/Buttons/Button'

import { fetchUserTaskStatus } from '../../utils/fetchData/student/userTask'
import {
  fetchEndTaskPerform,
  fetchUserTaskPerform,
} from '../../utils/fetchData/taskPerform'

import styles from './TaskPerform.module.scss'
import { fetchUserData } from '../../utils/fetchData/student/user'

function TaskPerform({
  user = {},
  setUser = () => {},
  userGroup = {},
  setUserGroup = () => {},
  setPageName,
}) {
  const [showAnswerTablePopUp, setShowAnswerTablePopUp] = useState(false)
  const [loading, setLoading] = useState(true)
  const [taskStatus, setTaskStatus] = useState('not_started')
  const [disabledEndTaskBtn, setDisabledEndTaskBtn] = useState(false)

  const [task, setTask] = useState({})

  const navigate = useNavigate()

  const taskId = useParams().taskId

  // Первоначальная настройка и получение данных
  useEffect(() => {
    setPageName('Выполнение задания')

    // Получение задания
    fetchUserTaskStatus(taskId)
      .then((res) => {
        if (res.status !== 'started') {
          setTaskStatus(res.status)
          setLoading(false)
        } else {
          // Если задание начато
          fetchUserTaskPerform(taskId).then((res) => {
            setTask(res)
            setTaskStatus('started')
            setLoading(false)
          })
        }
      })
      .catch((err) => console.log(err))
  }, [])

  // Загрузка
  if (loading) {
    return (
      <div className="wrapper spinLoaderWrapper">
        <SpinLoader />
      </div>
    )
  }

  // Вывод, если задание не начато
  if (taskStatus === 'not_started') {
    return (
      <div className="wrapper spinLoaderWrapper">
        <div className={styles.taskPerform__notStartedTaskBox}>
          <span className="text">
            Вы не запустили задание. Нажмите кнопку "начать задание" на странице
            задания.
          </span>
          <Button
            title="К заданию"
            onClick={() =>
              navigate(`../../task/${taskId}`, { relative: 'path' })
            }
          />
        </div>
      </div>
    )
  }

  // Вывод, если задание уже выполнено и не начато
  if (taskStatus === 'user_complete' || taskStatus === 'complete') {
    return (
      <div className="wrapper spinLoaderWrapper">
        <div className={styles.taskPerform__notStartedTaskBox}>
          <span className="text">Вы выполнили данное задание.</span>
          <Button
            title="К заданию"
            onClick={() =>
              navigate(`../../task/${taskId}`, { relative: 'path' })
            }
          />
        </div>
      </div>
    )
  }

  // TODO обработка завершения задания по нажатию клавиши "Завершить"
  const endTaskHandler = () => {
    setDisabledEndTaskBtn(true)
    fetchEndTaskPerform(taskId)
      .then((res) => {
        setTimeout(() => {
          setDisabledEndTaskBtn(false)
          navigate(`../../task/${taskId}`, { relative: 'path' })
        }, 1000)
      })
      .catch((err) => {
        setDisabledEndTaskBtn(false)
        if (err.message === 'AxiosError: Request failed with status code 403') {
          navigate(`../../task/${taskId}`, { relative: 'path' })
        }
      })
  }

  // TODO обработка завершения задания автоматически по окончанию времени

  // Определение типа условия практических заданий и установка условия всех заданий
  let infoForPracticeLabel
  let infoForPracticeText
  if (task.forPracticeDataType === 'randomNums') {
    infoForPracticeLabel = 'Выборка'
    const numbers = task.forPracticeData
    infoForPracticeText = numbers.join(', ')
  }

  return (
    <>
      <div className={'wrapper'}>
        <ContentHeader
          title={`Выполнение задания "${task.name}"`}
        ></ContentHeader>
        <TaskPerformHeader task={task} />

        {task.answersTable.length > 0 && (
          <>
            <ContentHeaderLabel
              title="Варианты ответов на теоретические вопросы"
              className={styles.taskPerform__titleHeader}
            />
            <AnswersTableOfQuestions
              answersTable={task.answersTable}
              taskId={task.originalTaskId}
            />
          </>
        )}

        {task.questions.length > 0 && (
          <>
            <ContentHeaderLabel
              title="Теоретические вопросы"
              className={styles.taskPerform__titleHeader}
            />
            <Questions
              questions={task.questions}
              userTaskId={task.id}
              onClickOpenAnswersTable={() => setShowAnswerTablePopUp(true)}
              initialEnteredAnswers={
                task.answersOnQuestions.length > 0
                  ? task.answersOnQuestions.reduce((obj, item) => {
                      obj[item.questionId] = item.answer
                      return obj
                    }, {})
                  : {}
              }
            />
          </>
        )}

        {task.practiceQuestions.length > 0 && (
          <>
            <ContentHeaderLabel
              title="Для выполнения практических заданий"
              className={styles.taskPerform__titleHeader}
            />
            <InfoForPracticeQuestions
              labelText={infoForPracticeLabel}
              text={infoForPracticeText}
            />

            <ContentHeaderLabel
              title="Практические задания"
              className={styles.taskPerform__titleHeader}
            />
            <PracticeQuestions
              questions={task.practiceQuestions}
              userTaskId={task.id}
              originalTaskId={task.originalTaskId}
              initialEnteredAnswers={
                task.answersOnPracticeQuestions.length > 0
                  ? task.answersOnPracticeQuestions.reduce((obj, item) => {
                      obj[item.questionId] = item.answer
                      return obj
                    }, {})
                  : {}
              }
            />
          </>
        )}

        <div className={styles.taskPerform__endButtonContainer}>
          <PrimaryButton
            disabled={disabledEndTaskBtn}
            title="Завершить"
            onClick={endTaskHandler}
            className={styles.taskPerform__endButton}
          />
        </div>
      </div>

      {showAnswerTablePopUp && (
        <PopUp
          className={styles.taskPerform__answersTablePopUp}
          headerText="Варианты ответов на теоритические вопросы"
          onCancel={() => setShowAnswerTablePopUp(false)}
          onClickBack={() => setShowAnswerTablePopUp(false)}
        >
          <AnswersTableOfQuestions
            answersTable={task.answersTable}
            taskId={task.originalTaskId}
          />
        </PopUp>
      )}
    </>
  )
}

export default TaskPerform
