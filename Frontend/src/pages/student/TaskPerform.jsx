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

import styles from './TaskPerform.module.scss'

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

  const [userTask, setUserTask] = useState({})
  const [originalTask, setOriginalTask] = useState({})

  const navigate = useNavigate()

  const taskId = useParams().taskId

  // Первоначальная настройка и получение данных
  useEffect(() => {
    setPageName('Выполнение задания')

    // Получение задания
    fetchUserTaskStatus(taskId)
      .then((res) => {
        // Если задание не начато
        setTaskStatus(res.status)
        setLoading(false)
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
    // TODO отправка данных на сервер
    navigate(`../../task/${taskId}`, { relative: 'path' })
  }

  // TODO обработка завершения задания автоматически по окончанию времени

  // Определение типа условия практических заданий и установка условия всех заданий
  let infoForPracticeLabel
  let infoForPracticeText
  if (originalTask.forPracticeData.type === 'randomNums') {
    infoForPracticeLabel = 'Выборка:'
    const numbers = eval(originalTask.forPracticeData.formule)()
    infoForPracticeText = numbers.join(', ')
  }

  return (
    <>
      <div className={'wrapper'}>
        <ContentHeader
          title={`Выполнение задания "${originalTask.name}"`}
        ></ContentHeader>
        <TaskPerformHeader task={userTask} originalTask={originalTask} />

        {originalTask.answersTable && (
          <>
            <ContentHeaderLabel
              title="Варианты ответов на теоретические вопросы"
              className={styles.taskPerform__titleHeader}
            />
            <AnswersTableOfQuestions
              answersTable={originalTask.answersTable}
              taskId={originalTask.id}
            />
          </>
        )}

        <ContentHeaderLabel
          title="Теоретические вопросы"
          className={styles.taskPerform__titleHeader}
        />
        <Questions
          questions={originalTask.questions}
          onClickOpenAnswersTable={() => setShowAnswerTablePopUp(true)}
        />

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
        <PracticeQuestions questions={originalTask.practiceQuestions} />

        <div className={styles.taskPerform__endButtonContainer}>
          <PrimaryButton
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
            answersTable={originalTask.answersTable}
            taskId={originalTask.id}
          />
        </PopUp>
      )}
    </>
  )
}

export default TaskPerform
