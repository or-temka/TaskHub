import getTimeExecuteInfo from '../../utils/getTimeExecuteInfo'
import ContentContainer from '../frames/ContentContainer'
import TextFocus from '../UI/Texts/TextFocus'

import styles from './TaskPerformHeader.module.scss'

function TaskPerformHeader({ task, originalTask, className, ...params }) {
  return (
    <ContentContainer
      {...params}
      className={[styles.taskPerformHeader, className].join(' ')}
    >
      <div className={styles.taskPerformHeader__info}>
        <TextFocus className={styles.taskPerformHeader__infoField}>
          <span className={styles.taskPerformHeader__infoLabel}>
            После этого задания у вас останется попыток:
          </span>
          <span
            className={[
              styles.taskPerformHeader__attemptCount,
              task.attemptsCount <= 1
                ? styles.taskPerformHeader__attemptCount_error
                : '',
            ].join(' ')}
          >
            {task.attemptsCount - 1}
          </span>
        </TextFocus>
        <TextFocus className={styles.taskPerformHeader__infoField}>
          <span className={styles.taskPerformHeader__infoLabel}>Вопросов:</span>
          <span>{originalTask.questions.length}</span>
        </TextFocus>
        <TextFocus className={styles.taskPerformHeader__infoField}>
          <span className={styles.taskPerformHeader__infoLabel}>
            Практических заданий:
          </span>
          <span>{originalTask.practiceQuestions.length}</span>
        </TextFocus>
        <TextFocus className={styles.taskPerformHeader__infoField}>
          <span className={styles.taskPerformHeader__infoLabel}>
            Времени на выполнение:
          </span>
          <span>{getTimeExecuteInfo(originalTask.timeForExecute)}</span>
        </TextFocus>
      </div>
      <TextFocus
        backgroundColor="var(--warning-light-color)"
        className={styles.taskPerformHeader__warningMsg}
      >
        Время выполнения уже идет и указано в правом нижнем углу. Как только
        время подойдет к 0 - форма автоматически закроется!
      </TextFocus>
    </ContentContainer>
  )
}

export default TaskPerformHeader
