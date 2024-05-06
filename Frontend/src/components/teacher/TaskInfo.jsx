import ContentContainer from '../frames/ContentContainer'
import TextFocus from '../UI/Texts/TextFocus'
import { ReactComponent as TaskSVG } from '../../assets/svg/tasks.svg'
import File from '../UI/Files/File'
import Button from '../UI/Buttons/Button'

import getTimeExecuteInfo from '../../utils/getTimeExecuteInfo'

import styles from './TaskInfo.module.scss'

function TaskInfo({
  task,
  taskFiles,
  onClickIssueTaskStudent = () => {},
  onClickIssueTaskGroup = () => {},
  className,
  ...params
}) {
  return (
    <ContentContainer
      {...params}
      className={[styles.taskInfo, className].join(' ')}
    >
      <header className={styles.taskInfo__header}>
        <div className={styles.taskInfo__labelContainer}>
          <TaskSVG />
          <h6>Проверочная работа по теме "{task.name}"</h6>
        </div>
      </header>
      <main className={styles.taskInfo__main}>
        <div className={styles.taskInfo__infoContainer}>
          <div>
            <div className={styles.taskInfo__secondTaskInfo}>
              <TextFocus className={styles.taskInfo__focusContainer}>
                <span className={'text-bold'}>
                  Начальное количество попыток:{' '}
                </span>
                <span
                  className={[
                    'text-bold',
                    styles.taskInfo__attemptsCount,
                    task.attempts === 0 && styles.taskInfo__attemptsCount_error,
                  ].join(' ')}
                >
                  {task.attempts}
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
                <span className={'text-bold'}>{task.questions.length}</span>
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
                  {task.practiceQuestions.length}
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
                  {getTimeExecuteInfo(task.timeForExecute)}
                </span>
              </TextFocus>
            </div>
          </div>
          <TextFocus className={styles.taskInfo__focusContainer}>
            <span className={'text-bold'}>Инструкции: </span>
            <span className={'paragraph'}>{task.instruction}</span>
          </TextFocus>
          {taskFiles.length !== 0 && (
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
          )}

          {/* Кнопки управления заданием для учителя */}
          <div className={styles.taskInfo__buttons}>
            <Button
              title="Выдать задание студенту"
              onClick={onClickIssueTaskStudent}
            />
            <Button
              title="Выдать задание группе"
              onClick={onClickIssueTaskGroup}
            />
          </div>
        </div>
      </main>
    </ContentContainer>
  )
}

export default TaskInfo
