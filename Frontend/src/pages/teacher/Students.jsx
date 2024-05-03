import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ContentHeader from '../../components/frames/ContentHeader'
import ButtonsContentHeader from '../../components/teacher/ButtonsContentHeader'
import Button from '../../components/UI/Buttons/Button'
import AddStudent from '../../components/teacher/PopUps/AddStudent'
import AddGroup from '../../components/teacher/PopUps/AddGroup'
import AddStudentsViaStrings from '../../components/teacher/PopUps/AddStudentsViaStrings'
import StudentsContent from '../../components/teacher/StudentsContent'
import Student from '../../components/teacher/PopUps/Student'
import SpinLoader from '../../components/UI/Loaders/SpinLoader'

import { fetchGroups } from '../../utils/fetchData/teacher/group'
import { fetchUsers } from '../../utils/fetchData/teacher/user'

import styles from './Students.module.scss'

function Students({ setPageName }) {
  const navigate = useNavigate()

  const [showAddStudent, setShowAddStudent] = useState(false)
  const [showAddGroup, setShowAddGroup] = useState(false)
  const [showAddStudentsViaStrings, setShowAddStudentsViaStrings] =
    useState(false)
  const [showStudentPopUp, setShowStudentPopUp] = useState(false)

  const [users, setUsers] = useState()
  const [groups, setGroups] = useState()
  const [user, setUser] = useState({})
  const [group, setGroup] = useState({})

  useEffect(() => {
    setPageName('Студенты')
  }, [])

  // Получение данных о пользователях
  useEffect(() => {
    fetchUsers().then((users) => setUsers(users))
  }, [])
  // Получение данных о группах
  useEffect(() => {
    fetchGroups().then((groups) => setGroups(groups))
  }, [])

  if (!groups || !users) {
    return (
      <div className="wrapper spinLoaderWrapper">
        <SpinLoader />
      </div>
    )
  }

  const openUserPopUpHandler = (userId) => {
    const user = users.find((user) => user._id === userId)
    const group = groups.find((group) => group._id === user.groupId)

    setUser(user)
    setGroup(group ? group : null)
    setShowStudentPopUp(true)
  }

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
          <StudentsContent
            groups={groups}
            users={users}
            onClickTr={(userId) => openUserPopUpHandler(userId)}
          />
        </main>
      </div>

      {/* PopUp`s for this page */}
      {showStudentPopUp && (
        <Student
          user={user}
          group={group}
          groups={groups}
          setNewUsers={setUsers}
          setNewGroups={setGroups}
          onCancel={() => setShowStudentPopUp(false)}
        />
      )}

      {/* PopUp`s */}
      {showAddStudent && (
        <AddStudent
          groups={groups}
          setNewUsers={setUsers}
          setNewGroups={setGroups}
          onAddStudent={() => setShowAddStudent(false)}
          onCancel={() => setShowAddStudent(false)}
        />
      )}
      {showAddGroup && (
        <AddGroup
          setNewGroups={setGroups}
          onAddGroup={() => setShowAddGroup(false)}
          onCancel={() => setShowAddGroup(false)}
        />
      )}
      {showAddStudentsViaStrings && (
        <AddStudentsViaStrings
          setNewUsers={setUsers}
          setNewGroups={setGroups}
          onCancel={() => setShowAddStudentsViaStrings(false)}
        />
      )}
    </>
  )
}

export default Students
