import ContentHeader from '../../components/frames/ContentHeader'
import SmallTaskInfo from '../../components/student/SmallTaskInfo'

import styles from './Tasks.module.scss'

import { userTasks } from '../../data/userTasks'
import { tasks } from '../../data/tasks'

const PAGE_NAME = 'Задания'

function Tasks({ setPageName }) {
  setPageName(PAGE_NAME)

  return (
    <div className={['wrapper', styles.tasks].join(' ')}>
      <ContentHeader title={PAGE_NAME}></ContentHeader>
      <div className={styles.tasks__tasks}>
        {userTasks.map((task) => {
          const taskInfo = tasks.find(
            (originalTask) => originalTask.id === task.originalTaskId
          )
          return (
            <SmallTaskInfo task={task} originalTask={taskInfo} key={task.id} />
          )
        })}
      </div>
    </div>
  )
}

export default Tasks
