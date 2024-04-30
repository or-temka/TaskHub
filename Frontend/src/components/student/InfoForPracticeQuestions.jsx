import ContentContainer from '../frames/ContentContainer'

import styles from './InfoForPracticeQuestions.module.scss'

function InfoForPracticeQuestions({
  labelText = '',
  text = '',
  className,
  ...params
}) {
  return (
    <ContentContainer
      {...params}
      className={[styles.infoForPracticeQuestions, className].join(' ')}
    >
      <div className={styles.infoForPracticeQuestions__container}>
        {labelText && (
          <span
            className={[
              'text-bold',
              styles.infoForPracticeQuestions__label,
            ].join(' ')}
          >
            {labelText}:
          </span>
        )}
        <span
          className={[
            'text',
            styles.infoForPracticeQuestions__textContent,
          ].join(' ')}
        >
          {text}
        </span>
      </div>
    </ContentContainer>
  )
}

export default InfoForPracticeQuestions
