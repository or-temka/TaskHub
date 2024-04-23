import StudentsFilter from './Filters/StudentsFilter'
import styles from './StudentsContent.module.scss'

function StudentsContent({ users, groups, className, ...params }) {
  return (
    <>
      <div
        {...params}
        className={[styles.studentsContent, className].join(' ')}
      >
        <div className={styles.studentsContent__filter}>
          <StudentsFilter groups={groups} />
        </div>
        <div className={styles.studentsContent__content}></div>
      </div>
    </>
  )
}

export default StudentsContent
