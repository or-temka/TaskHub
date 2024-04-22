import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import TaskPerformHeader from '../../components/student/TaskPerformHeader'
import ContentHeader from '../../components/frames/ContentHeader'
import ContentHeaderLabel from '../../components/frames/ContentHeaderLabel'
import Questions from '../../components/student/Questions'
import PracticeQuestions from '../../components/student/PracticeQuestions'
import PrimaryButton from '../../components/UI/Buttons/PrimaryButton'

import { userTasks } from '../../data/userTasks'
import { tasks } from '../../data/tasks'

import styles from './TaskPerform.module.scss'

function TaskPerform({ setPageName }) {
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

        <ContentHeaderLabel
          title="Вопросы"
          className={styles.taskPerform__titleHeader}
        />
        <Questions questions={originalTask.questions} />

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
    </>
  )
}

export default TaskPerform
