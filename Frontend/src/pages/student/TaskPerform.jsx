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

import { userTasks } from '../../data/userTasks'
import { tasks } from '../../data/tasks'

import styles from './TaskPerform.module.scss'

function TaskPerform({ setPageName }) {
  const [showAnswerTablePopUp, setShowAnswerTablePopUp] = useState(false)

  const navigate = useNavigate()

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

  // TODO обработка завершения задания по нажатию клавиши "Завершить"
  const endTaskHandler = () => {
    // TODO отправка данных на сервер
    navigate(`../../task/${taskId}`, { relative: 'path' })
  }

  // TODO обработка завершения задания автоматически по окончанию времени

  return (
    <>
      <div className={'wrapper'}>
        <ContentHeader
          title={`Выполнение задания "${originalTask.name}"`}
        ></ContentHeader>
        <TaskPerformHeader task={task} originalTask={originalTask} />

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
