import ContentHeader from '../../components/frames/ContentHeader'
import SmallTaskInfo from '../../components/student/SmallTaskInfo'

import styles from './Tasks.module.scss'

import { userTasks } from '../../data/userTasks'

const PAGE_NAME = 'Задания'

function Tasks({ setPageName }) {
  setPageName(PAGE_NAME)

  return (
    <div className={['wrapper', styles.tasks].join(' ')}>
      <ContentHeader title={PAGE_NAME}></ContentHeader>
      <div className={styles.tasks__tasks}>
        {userTasks.map((task) => (
          <SmallTaskInfo task={task} key={task.id} />
        ))}
      </div>
    </div>
  )
}

export default Tasks
