import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ContentHeader from '../../components/frames/ContentHeader'
import ButtonsContentHeader from '../../components/teacher/ButtonsContentHeader'
import Button from '../../components/UI/Buttons/Button'
import AddStudent from '../../components/teacher/PopUps/AddStudent'
import AddGroup from '../../components/teacher/PopUps/AddGroup'
import AddStudentsViaStrings from '../../components/teacher/PopUps/AddStudentsViaStrings'
import StudentsContent from '../../components/teacher/StudentsContent'

import groups from '../../data/groups'
import users from '../../data/users'

import styles from './Students.module.scss'

function Students({ setPageName }) {
  const navigate = useNavigate()

  const [showAddStudent, setShowAddStudent] = useState(false)
  const [showAddGroup, setShowAddGroup] = useState(false)
  const [showAddStudentsViaStrings, setShowAddStudentsViaStrings] =
    useState(false)

  useEffect(() => {
    setPageName('Студенты')
  }, [])

  return (
    <>
      <div className={['wrapper', styles.students].join(' ')}>
        {/* HEADER */}
        <ContentHeader
          title="Студенты"
          className={styles.students__contentHeader}
          classNameForContent={styles.students__contentHeaderContent}
        >
          <ButtonsContentHeader
            onClickAddStudent={() => setShowAddStudent(true)}
            onClickAddGroup={() => setShowAddGroup(true)}
            onClickAddViaStrings={() => setShowAddStudentsViaStrings(true)}
          >
            <Button
              title="Группы"
              onClick={() => navigate('groups', { relative: 'route' })}
            />
          </ButtonsContentHeader>
        </ContentHeader>

        {/* CONTENT */}
        <main className={styles.students__main}>
          <StudentsContent groups={groups} users={users} />
        </main>
      </div>

      {/* PopUp`s */}
      {showAddStudent && (
        <AddStudent
          onAddStudent={() => setShowAddStudent(false)}
          onCancel={() => setShowAddStudent(false)}
        />
      )}
      {showAddGroup && (
        <AddGroup
          onAddGroup={() => setShowAddGroup(false)}
          onCancel={() => setShowAddGroup(false)}
        />
      )}
      {showAddStudentsViaStrings && (
        <AddStudentsViaStrings
          onCancel={() => setShowAddStudentsViaStrings(false)}
        />
      )}
    </>
  )
}

export default Students
