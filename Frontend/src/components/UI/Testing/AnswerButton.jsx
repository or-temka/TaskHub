import styles from './AnswerButton.module.css'

function AnswerButton({
  number,
  text,
  className,
  numberClassName,
  textClassName,
  status = 'passive',
}) {
  return (
    <div className={[styles.answerButton, className].join(' ')}>
      <span
        className={[
          styles.answerButton__number,
          numberClassName,
          status === 'notActive' && styles.answerButton__number_notActive,
          status === 'active' && styles.answerButton__number_active,
        ].join(' ')}
      >
        {number}
      </span>
      <span
        className={[
          styles.answerButton__text,
          textClassName,
          status === 'active' && styles.answerButton__text_active,
        ].join(' ')}
      >
        {text}
      </span>
    </div>
  )
}

export default AnswerButton
