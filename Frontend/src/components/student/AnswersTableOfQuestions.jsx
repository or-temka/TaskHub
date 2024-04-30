import ContentContainer from '../frames/ContentContainer'
import FrameContent from '../frames/FrameContent'

import styles from './AnswersTableOfQuestions.module.scss'

function AnswersTableOfQuestions({
  answersTable,
  taskId,
  className,
  ...params
}) {
  return (
    <ContentContainer
      {...params}
      className={[styles.answersTableOfQuestions, className].join(' ')}
    >
      <FrameContent
        className={styles.answersTableOfQuestions__frame}
        contentClassName={styles.answersTableOfQuestions__frameContent}
      >
        {answersTable.map((answer) => (
          <div
            className={styles.answersTableOfQuestions__answer}
            key={answer.id}
          >
            <div className={styles.answersTableOfQuestions__answerNum}>
              <span
                className={[
                  'text-bold',
                  styles.answersTableOfQuestions__answerNumText,
                ].join(' ')}
              >
                {answer.id}
              </span>
            </div>
            <div className={styles.answersTableOfQuestions__answerContent}>
              <img
                src={require(`../../assets/images/tasks/${taskId}/${answer.imgSrc}`)}
                className={styles.answersTableOfQuestions__img}
              />
            </div>
          </div>
        ))}
      </FrameContent>
    </ContentContainer>
  )
}

export default AnswersTableOfQuestions
