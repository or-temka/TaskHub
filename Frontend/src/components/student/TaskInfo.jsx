import { Link } from 'react-router-dom'
import ContentContainer from '../frames/ContentContainer'
import ColorTextMsg from '../UI/Texts/ColorTextMsg'
import Button from '../UI/Buttons/Button'
import PrimaryButton from '../UI/Buttons/PrimaryButton'
import TextFocus from '../UI/Texts/TextFocus'
import { ReactComponent as TaskSVG } from '../../assets/svg/tasks.svg'

import styles from './TaskInfo.module.scss'
import File from '../UI/Files/File'
import getTimeExecuteInfo from '../../utils/getTimeExecuteInfo'

function TaskInfo({ task, originalTask, taskFiles, className, ...params }) {
  return (
    <ContentContainer
      {...params}
      className={[styles.taskInfo, className].join(' ')}
    >
      <header className={styles.taskInfo__header}>
        <div className={styles.taskInfo__labelContainer}>
          <TaskSVG />
          <h6>Проверочная работа по теме "{originalTask.name}"</h6>
        </div>
        <div className={styles.taskInfo__headerContentContainer}>
          <div className={styles.taskInfo__headerContent}>
            {task.mark ? (
              <ColorTextMsg
                msgType="success"
                className={styles.taskInfo__colorTextMsg}
              >
                Выполнено
              </ColorTextMsg>
            ) : task.newTask ? (
              <ColorTextMsg
                msgType="warning"
                className={styles.taskInfo__colorTextMsg}
              >
                Новое
              </ColorTextMsg>
            ) : (
              ''
            )}
            <span className={['small-text', styles.taskInfo__date].join(' ')}>
              {task.dateCreate}
            </span>
          </div>
          {task.mark && (
            <div className={styles.taskInfo__markContainer}>
              {/* <div>
                <TextFocus>
                  <span className={styles.taskInfo__termLabel}>Срок: </span>
                  <span>до 15 марта</span>
                </TextFocus>
              </div> */}

              <div>
                <TextFocus className={styles.taskInfo__markLabel}>
                  Оценка:
                </TextFocus>
                <TextFocus
                  className={['text-bold', styles.taskInfo__mark].join(' ')}
                  backgroundColor={
                    task.mark >= 4
                      ? 'var(--success-light-color)'
                      : task.mark <= 2
                      ? 'var(--error-color)'
                      : 'var(--warning-color)'
                  }
                >
                  {task.mark}
                </TextFocus>
              </div>
            </div>
          )}
        </div>
      </header>
      <main className={styles.taskInfo__main}>
        <div className={styles.taskInfo__infoContainer}>
          <div>
            <div className={styles.taskInfo__secondTaskInfo}>
              <TextFocus className={styles.taskInfo__focusContainer}>
                <span className={'text-bold'}>Осталось попыток: </span>
                <span
                  className={['text-bold', styles.taskInfo__attemptsCount].join(
                    ' '
                  )}
                >
                  {task.attemptsCount}
                </span>
              </TextFocus>
              <TextFocus className={styles.taskInfo__focusContainer}>
                <span
                  className={['text-bold', styles.taskInfo__focusLabel].join(
                    ' '
                  )}
                >
                  Вопросов:{' '}
                </span>
                <span className={'text-bold'}>
                  {originalTask.questions.length}
                </span>
              </TextFocus>
              <TextFocus className={styles.taskInfo__focusContainer}>
                <span
                  className={['text-bold', styles.taskInfo__focusLabel].join(
                    ' '
                  )}
                >
                  Практических заданий:{' '}
                </span>
                <span className={'text-bold'}>
                  {originalTask.practiceQuestions.length}
                </span>
              </TextFocus>
              <TextFocus
                className={[
                  styles.taskInfo__focusContainer,
                  styles.taskInfo__timeForExecute,
                ].join(' ')}
              >
                <span
                  className={['text-bold', styles.taskInfo__focusLabel].join(
                    ' '
                  )}
                >
                  Времени на выполнение:{' '}
                </span>
                <span className={'text-bold'}>
                  {getTimeExecuteInfo(originalTask.timeForExecute)}
                </span>
              </TextFocus>
            </div>
          </div>
          <TextFocus className={styles.taskInfo__focusContainer}>
            <span className={'text-bold'}>Инструкции: </span>
            <span className={'paragraph'}>{originalTask.instruction}</span>
          </TextFocus>
          <TextFocus
            className={[
              styles.taskInfo__focusContainer,
              styles.taskInfo__files,
            ].join(' ')}
          >
            <span className={'text-bold'}>Справочный материал: </span>
            {taskFiles.map((file) => (
              <File
                key={file.id}
                extension={file.extension}
                fileName={`${file.name}.${file.extension}`}
                downloadLink={`/assets/files/${file.type}/${file.fileName}.${file.extension}`}
              />
            ))}
          </TextFocus>
        </div>
        <div className={styles.taskInfo__buttons}>
          <PrimaryButton
            title="Перейти к выполнению"
            className={styles.taskInfo__button}
          />
        </div>
      </main>
    </ContentContainer>
  )
}

export default TaskInfo
