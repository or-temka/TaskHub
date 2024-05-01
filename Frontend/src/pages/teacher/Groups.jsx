import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ContentHeader from '../../components/frames/ContentHeader'
import ButtonsContentHeader from '../../components/teacher/ButtonsContentHeader'
import Button from '../../components/UI/Buttons/Button'
import AddStudent from '../../components/teacher/PopUps/AddStudent'
import AddGroup from '../../components/teacher/PopUps/AddGroup'
import AddStudentsViaStrings from '../../components/teacher/PopUps/AddStudentsViaStrings'
import GroupsContent from '../../components/teacher/GroupsContent'
import Group from '../../components/teacher/PopUps/Group'
import SpinLoader from '../../components/UI/Loaders/SpinLoader'

import { fetchGroups } from '../../utils/fetchData/teacher/group'
import { fetchUsers } from '../../utils/fetchData/teacher/user'

import styles from './Groups.module.scss'

function Groups({ setPageName }) {
  const navigate = useNavigate()

  const [groups, setGroups] = useState()
  const [users, setUsers] = useState()

  const [showGroupPopUp, setShowGroupPopUp] = useState(false)
  const [showAddStudent, setShowAddStudent] = useState(false)
  const [showAddGroup, setShowAddGroup] = useState(false)
  const [showAddStudentsViaStrings, setShowAddStudentsViaStrings] =
    useState(false)

  const [enteredGroup, setEnteredGroup] = useState()

  useEffect(() => {
    setPageName('Группы')
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

  // Выбранная группа в PopUp просмотре группы
  const setEnteredGroupHandler = (id) => {
    const enteredG = groups.find((group) => group._id === id)
    setEnteredGroup(enteredG)
  }

  // Удаление пользователя из группы на клиенте
  const delUserFromGroup = (groupId, userId) => {
    const newGroup = groups.find((group) => group.id === groupId)
    const userInGroup = newGroup.studentsId.find(
      (studentId) => studentId === userId
    )
    if (!userInGroup) return
    const userIndexInGroup = newGroup.studentsId.indexOf(userInGroup)

    newGroup.studentsId.splice(userIndexInGroup, 1)
    const newGroups = [...groups]
    newGroups.forEach((group) => {
      if (group.id === groupId) {
        group = newGroup
      }
    })
    setGroups(newGroups)
  }

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
            onClickAddGroup={() => setShowAddGroup(true)}
            onClickAddViaStrings={() => setShowAddStudentsViaStrings(true)}
          >
            <Button
              title="Студенты"
              onClick={() => navigate('../', { relative: 'route' })}
            />
          </ButtonsContentHeader>
        </ContentHeader>

        {/* CONTENT */}
        <main className={styles.groups__main}>
          <GroupsContent
            groups={groups}
            users={users}
            onClickTr={(id) => {
              setEnteredGroupHandler(id)
              setShowGroupPopUp(true)
            }}
          />
        </main>
      </div>

      {/* PopUp`s for this page */}
      {showGroupPopUp && (
        <Group
          setNewGroups={setGroups}
          onCancel={() => setShowGroupPopUp(false)}
          groupData={enteredGroup}
          users={users}
          delUserHandler={delUserFromGroup}
        />
      )}

      {/* PopUp`s for header*/}
      {showAddStudent && (
        <AddStudent
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
          onCancel={() => setShowAddStudentsViaStrings(false)}
        />
      )}
    </>
  )
}

export default Groups
