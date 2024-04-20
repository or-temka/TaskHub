import getTimeExecuteInfo from '../../utils/getTimeExecuteInfo'
import ContentContainer from '../frames/ContentContainer'

import styles from './TaskAdoptStatistic.module.scss'
import TaskAdoptStatisticLine from './TaskAdoptStatisticLine'

function TaskAdoptStatistic({
  className,
  taskStatistic,
  questionsCount,
  ...params
}) {
  const taskAvarageMark = taskStatistic.avarageMark

  return (
    <ContentContainer
      {...params}
      className={[styles.taskAdoptStatistic, className].join(' ')}
    >
      <div className={styles.taskAdoptStatistic__linesWithStatistics}>
        <TaskAdoptStatisticLine
          title="Средний балл других студентов за это задание"
          value={taskAvarageMark}
          valueBackgroundColor={
            taskAvarageMark >= 4
              ? 'var(--success-light-color)'
              : taskAvarageMark >= 3
              ? 'var(--warning-color)'
              : 'var(--error-light-color)'
          }
          adoptInfo={
            taskAvarageMark >= 4.4
              ? '(простое задание)'
              : taskAvarageMark <= 3.6
              ? '(сложное задание)'
              : ''
          }
        />
        <TaskAdoptStatisticLine
          title="Среднее время выполнения задания:"
          value={getTimeExecuteInfo(taskStatistic.avarageTimeTask)}
        />
        <TaskAdoptStatisticLine
          title="Среднее время ответа на вопрос:"
          value={getTimeExecuteInfo(taskStatistic.avarageTimeQuestion)}
        />
        <TaskAdoptStatisticLine
          title="Самое маленькое количество верных ответов:"
          value={taskStatistic.leastCorrectAnswers}
          outOfValue={questionsCount}
        />
        <TaskAdoptStatisticLine
          title="Самое большое количество верных ответов:"
          value={taskStatistic.mostCorrectAnswers}
          outOfValue={questionsCount}
        />
        <TaskAdoptStatisticLine
          title="Студентов решило задание:"
          value={taskStatistic.usersExecuted}
        />
        <TaskAdoptStatisticLine
          title="Всего задание решено:"
          value={taskStatistic.executedCount}
          textAfterValue="раз(а)"
        />
      </div>
    </ContentContainer>
  )
}

export default TaskAdoptStatistic
