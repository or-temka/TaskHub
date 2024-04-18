import ContentContainer from '../frames/ContentContainer'
import ColorTextMsg from '../UI/Texts/ColorTextMsg'
import Button from '../UI/Buttons/Button'
import PrimaryButton from '../UI/Buttons/PrimaryButton'
import TextFocus from '../UI/Texts/TextFocus'
import { ReactComponent as TaskSVG } from '../../assets/svg/tasks.svg'

import styles from './SmallTaskInfo.module.scss'
import { Link } from 'react-router-dom'

function SmallTaskInfo({ className, task = {}, ...params }) {
  return (
    <ContentContainer
      {...params}
      headBorderColor={
        task.mark ? 'var(--success-color)' : 'var(--warning-color)'
      }
      className={[styles.smallTaskInfo, className].join(' ')}
    >
      <header className={styles.smallTaskInfo__header}>
        <div className={styles.smallTaskInfo__labelContainer}>
          <TaskSVG />
          <Link to="task" className={styles.smallTaskInfo__labelLink}>
            <h6 className={styles.smallTaskInfo__labelText}>{task.name}</h6>
          </Link>
        </div>
        <div className={styles.smallTaskInfo__headerContentContainer}>
          <div className={styles.smallTaskInfo__headerContent}>
            {task.mark ? (
              <ColorTextMsg
                msgType="success"
                className={styles.smallTaskInfo__colorTextMsg}
              >
                Выполнено
              </ColorTextMsg>
            ) : task.newTask ? (
              <ColorTextMsg
                msgType="warning"
                className={styles.smallTaskInfo__colorTextMsg}
              >
                Новое
              </ColorTextMsg>
            ) : (
              ''
            )}
            <span
              className={['small-text', styles.smallTaskInfo__date].join(' ')}
            >
              {task.dateCreate}
            </span>
          </div>
          {task.mark && (
            <div className={styles.smallTaskInfo__markContainer}>
              <span className={styles.smallTaskInfo__markLabel}>Оценка: </span>
              <span
                className={[
                  'text-bold',
                  styles.smallTaskInfo__mark,
                  task.mark >= 4
                    ? styles.smallTaskInfo__mark_success
                    : task.mark <= 2
                    ? styles.smallTaskInfo__mark_error
                    : styles.smallTaskInfo__mark_warning,
                ].join(' ')}
              >
                {task.mark}
              </span>
            </div>
          )}
        </div>
      </header>
      <main className={styles.smallTaskInfo__main}>
        <div className={styles.smallTaskInfo__infoContainer}>
          <span className={'paragraph'}>{task.text}</span>
          <TextFocus className={styles.smallTaskInfo__attemptsContainer}>
            <span className={'text-bold'}>Осталось попыток: </span>
            <span
              className={[
                'text-bold',
                styles.smallTaskInfo__attemptsCount,
              ].join(' ')}
            >
              {task.attemptsCount}
            </span>
          </TextFocus>
        </div>
        <div className={styles.smallTaskInfo__buttons}>
          <Link
            to="task"
            className={styles.smallTaskInfo__moreButtonLink}
          >
            <Button title="Подробнее" className={styles.smallTaskInfo__button} />
          </Link>

          {task.attemptsCount > 0 && (
            <PrimaryButton
              title="Перейти к выполнению"
              className={styles.smallTaskInfo__button}
            />
          )}
        </div>
      </main>
    </ContentContainer>
  )
}

export default SmallTaskInfo
