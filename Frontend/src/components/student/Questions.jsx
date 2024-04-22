import { useState } from 'react'
import ContentContainer from '../frames/ContentContainer'
import AnswerButton from '../UI/Testing/AnswerButton'

import styles from './Questions.module.scss'

function Questions({ questions, className, ...params }) {
  const [choicedAnswers, setChoicedAnswers] = useState({}) // {questionId1: choicedAnswerId1, ...} ex: {1: 2, 2: 4, 3: 1, 4: 1}

  // Обработка выбора ответа
  const choiceAnswer = (questionId, answerId) => {
    // TODO отправка данных на сервер - выбранный ответ

    setChoicedAnswers({
      ...choicedAnswers,
      [questionId]: answerId,
    })
  }

  return (
    <div className={[styles.questions, className].join(' ')}>
      {questions.map((question) => (
        <ContentContainer
          key={question.id}
          {...params}
          className={styles.questions__container}
        >
          <span className="text">{question.questionText}</span>
          <div className={styles.questions__questions}>
            {question.answers.map((answer, index) => (
              <AnswerButton
                key={answer.id}
                number={index + 1}
                text={answer.text}
                onClick={() => choiceAnswer(question.id, answer.id)}
                status={
                  choicedAnswers[question.id]
                    ? choicedAnswers[question.id] === answer.id
                      ? 'active'
                      : 'notActive'
                    : 'passive'
                }
              />
            ))}
          </div>
        </ContentContainer>
      ))}
    </div>
  )
}

export default Questions
