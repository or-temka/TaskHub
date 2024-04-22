import { Link, useNavigate } from 'react-router-dom'

import ContentContainer from '../frames/ContentContainer'
import { ReactComponent as TaskSVG } from '../../assets/svg/tasks.svg'

import styles from './Tasks.module.scss'
import Button from '../UI/Buttons/Button'

function Tasks({ tasks, className, ...params }) {
  const navigate = useNavigate()

  return (
    <div {...params} className={[styles.tasks, className].join(' ')}>
      {tasks.map((task) => (
        <ContentContainer key={task.id} className={styles.tasks__task}>
          <div className={styles.tasks__labelContainer}>
            <TaskSVG />
            <Link to={`../task/${task.id}`} className={styles.tasks__labelLink}>
              <h6 className={styles.tasks__label}>
                Проверочная работа по теме "{task.name}"
              </h6>
            </Link>
          </div>
          <div className={styles.tasks__buttons}>
            <Button
              title="Подробнее"
              onClick={() =>
                navigate(`../task/${task.id}`, { relative: 'route' })
              }
            />
          </div>
        </ContentContainer>
      ))}
    </div>
  )
}

export default Tasks
