import { useEffect, useState } from 'react'

import styles from './Groups.module.scss'
import ContentHeader from '../../components/frames/ContentHeader'
import ButtonsContentHeader from '../../components/teacher/ButtonsContentHeader'
import Button from '../../components/UI/Buttons/Button'
import { useNavigate } from 'react-router-dom'
import AddStudent from '../../components/teacher/PopUps/AddStudent'

function Groups({ setPageName }) {
  const navigate = useNavigate()

  const [showAddStudent, setShowAddStudent] = useState(false)

  useEffect(() => {
    setPageName('Группы')
  }, [])

  return (
    <>
      <div className={['wrapper', styles.groups].join(' ')}>
        {/* HEADER */}
        <ContentHeader
          title="Группы"
          className={styles.groups__contentHeader}
          classNameForContent={styles.groups__contentHeaderContent}
        >
          <ButtonsContentHeader
            onClickAddStudent={() => setShowAddStudent(true)}
          >
            <Button
              title="Студенты"
              onClick={() => navigate('../', { relative: 'route' })}
            />
          </ButtonsContentHeader>
        </ContentHeader>

        {/* CONTENT */}
        <main className={styles.groups__main}></main>
      </div>

      {/* PopUp`s */}
      {showAddStudent && (
        <AddStudent
          onAddStudent={() => setShowAddStudent(false)}
          onCancel={() => setShowAddStudent(false)}
        />
      )}
    </>
  )
}

export default Groups
