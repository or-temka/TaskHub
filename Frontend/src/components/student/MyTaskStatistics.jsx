import TaskAdoptStatisticLine from './TaskAdoptStatisticLine'
import ContentContainer from '../frames/ContentContainer'

import getTimeExecuteInfo from '../../utils/getTimeExecuteInfo'
import rounder from '../../utils/rounder'

import styles from './MyTaskStatistics.module.scss'

function MyTaskStatistics({ userTask, questionsCount, className, ...params }) {
  const taskStatistics = userTask.statistics

  return (
    <ContentContainer
      {...params}
      className={[styles.myTaskStatistics, className].join(' ')}
    >
      <div className={styles.myTaskStatistics__linesWithStatistics}>
        <TaskAdoptStatisticLine
          title="Балл за задание:"
          value={rounder(userTask.notRoundMark)}
          valueChangeTo={userTask.mark}
          valueBackgroundColor={
            userTask.notRoundMark >= 4
              ? 'var(--success-light-color)'
              : userTask.notRoundMark >= 3
              ? 'var(--warning-color)'
              : 'var(--error-light-color)'
          }
          valueChangeToBackgroundColor={
            userTask.mark >= 4
              ? 'var(--success-light-color)'
              : userTask.mark >= 3
              ? 'var(--warning-color)'
              : 'var(--error-light-color)'
          }
          adoptInfo="(оценка округлена)"
        />
        <TaskAdoptStatisticLine
          title="Время выполнения задания:"
          value={getTimeExecuteInfo(taskStatistics.taskRuntime)}
        />
        <TaskAdoptStatisticLine
          title="Среднее время ответа на вопрос:"
          value={getTimeExecuteInfo(taskStatistics.avarageQuestionTime)}
        />
        <TaskAdoptStatisticLine
          title="Количество верных ответов:"
          value={taskStatistics.trueAnswersCount}
          outOfValue={questionsCount}
        />
      </div>
    </ContentContainer>
  )
}

export default MyTaskStatistics
