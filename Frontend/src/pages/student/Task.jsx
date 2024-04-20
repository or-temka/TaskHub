import ContentHeader from '../../components/frames/ContentHeader'
import ContentHeaderLabel from '../../components/frames/ContentHeaderLabel'
import TaskInfo from '../../components/student/TaskInfo'

import { userTasks } from '../../data/userTasks'
import { tasks } from '../../data/tasks'
import { files } from '../../data/files'

import styles from './Task.module.scss'
import TaskAdoptStatistic from '../../components/student/TaskAdoptStatistic'
import MyTaskStatistics from '../../components/student/MyTaskStatistics'

function Task({ setPageName }) {
  setPageName('Задание')

  const userTask = userTasks[0]
  const taskInfo = tasks.find((task) => task.id === userTask.originalTaskId)
  const taskFiles = files.filter((file) => taskInfo.filesId.includes(file.id))

  return (
    <div className={['wrapper', styles.task].join(' ')}>
      <ContentHeader title="Задание"></ContentHeader>

      <TaskInfo task={userTask} originalTask={taskInfo} taskFiles={taskFiles} />

      {userTask.mark && (
        <>
          <ContentHeaderLabel
            title="Мои результаты и статистика по заданию"
            className={styles.task__fieldHeader}
          />
          <MyTaskStatistics
            userTask={userTask}
            questionsCount={taskInfo.questions.length}
          />
        </>
      )}

      <ContentHeaderLabel
        title="Статистика по заданию"
        className={styles.task__fieldHeader}
      />
      <TaskAdoptStatistic
        taskStatistic={taskInfo.statistic}
        questionsCount={taskInfo.questions.length}
      />
    </div>
  )
}

export default Task
