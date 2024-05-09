import { useState } from 'react'
import ContentContainer from '../frames/ContentContainer'
import AnswerButton from '../UI/Testing/AnswerButton'

import styles from './Questions.module.scss'
import Input from '../UI/Inputs/Input'

function Questions({
  questions,
  onClickOpenAnswersTable = () => {},
  className,
  ...params
}) {
  const [choicedAnswers, setChoicedAnswers] = useState({}) // {questionId1: choicedAnswerId1, ...} ex: {1: 2, 2: 4, 3: 1, 4: 1}

  // Обработка выбора ответа
  const choiceAnswer = (questionId, answer) => {
    // TODO отправка данных на сервер - выбранный ответ

    setChoicedAnswers({
      ...choicedAnswers,
      [questionId]: answer,
    })
  }

  return (
    <div {...params} className={[styles.questions, className].join(' ')}>
      {questions.map((question) => {
        if (question.type === 'choice') {
          return (
            // Задачи с выбором ответа
            <ContentContainer
              key={question.id}
              className={styles.questions__container}
            >
              <span className="text">{question.questionText}</span>
              <div className={styles.questions__answers}>
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
          )
        } else if (question.type === 'enter') {
          return (
            // Задачи с вписанием ответа в поле
            <ContentContainer
              key={question.id}
              className={styles.questions__container}
            >
              <div className={styles.questions__questionHeader}>
                <span className="text">{question.questionText}</span>
                <span
                  className={[
                    'text',
                    styles.questions__openAnswersTableBtn,
                  ].join(' ')}
                  onClick={onClickOpenAnswersTable}
                >
                  Открыть варианты ответов
                </span>
              </div>

              <Input
                placeholder="Введите номер формулы"
                value={choicedAnswers[question.id]}
                onChange={(e) => choiceAnswer(question.id, e.target.value)}
                className={styles.questions__enterFormuleNumInput}
              />
            </ContentContainer>
          )
        }
      })}
    </div>
  )
}

export default Questions
