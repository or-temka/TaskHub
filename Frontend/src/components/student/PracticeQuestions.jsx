import { useState } from 'react'

import ContentContainer from '../frames/ContentContainer'
import Input from '../UI/Inputs/Input'

import styles from './PracticeQuestions.module.scss'

function PracticeQuestions({
  questions,
  originalTaskId,
  className,
  ...params
}) {
  const [enteredAnswers, setEnteredAnswers] = useState({}) // {questionId1: enteredAnswer, ...} ex: {1: "Привет", 2: "Пока",}

  // Обработка написания ответа (изменения input-ов)
  const inputAnswer = (questionId, answer) => {
    // TODO отправка данных на сервер - написанный ответ

    setEnteredAnswers({
      ...enteredAnswers,
      [questionId]: answer,
    })
  }

  return (
    <div
      {...params}
      className={[styles.practiceQuestions, className].join(' ')}
    >
      {questions.map((question) => (
        <ContentContainer
          key={question.id}
          className={styles.practiceQuestions__content}
        >
          <span className={styles.practiceQuestions__taskHint}>
            Решите задание и запишите правильный ответ в поле для ввода.
          </span>
          <span className={styles.practiceQuestions__taskText}>
            {question.text}
          </span>
          {question.imgSrc && (
            <img
              src={require(`../../assets/images/tasks/${originalTaskId}/${question.imgSrc}`)}
              alt={question.imgSrc}
              className={styles.practiceQuestions__image}
            />
          )}
          <div className={styles.practiceQuestions__answer}>
            <span className={styles.practiceQuestions__answerBeforeText}>
              Ответ:
            </span>
            {question.beforeAnswerText && (
              <span className={styles.practiceQuestions__answerBeforeText}>
                {question.beforeAnswerText}
              </span>
            )}

            <Input
              wrapperClassName={styles.practiceQuestions__answerInput}
              onChange={(e) => inputAnswer(question.id, e.target.value)}
              placeholder="Введите ваш ответ"
              value={enteredAnswers[question.id]}
            />
            {question.unit && (
              <>
                {' '}
                <span className={styles.practiceQuestions__answerUnit}>
                  {question.unit}
                </span>
                <span className={styles.practiceQuestions__answerHint}>
                  (в ответе не указывается единица измерения)
                </span>
              </>
            )}
          </div>
        </ContentContainer>
      ))}
    </div>
  )
}

export default PracticeQuestions
