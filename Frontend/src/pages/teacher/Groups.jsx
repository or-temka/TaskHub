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

import groups from '../../data/groups'
import users from '../../data/users'

import styles from './Groups.module.scss'

function Groups({ setPageName }) {
  const navigate = useNavigate()

  const [showGroupPopUp, setShowGroupPopUp] = useState(false)
  const [enteredGroupIdForPopUp, setEnteredGroupIdForPopUp] = useState()

  const [showAddStudent, setShowAddStudent] = useState(false)
  const [showAddGroup, setShowAddGroup] = useState(false)
  const [showAddStudentsViaStrings, setShowAddStudentsViaStrings] =
    useState(false)

  useEffect(() => {
    setPageName('Группы')
  }, [])

  // Выбранная группа по нажатию в таблицу
  const enteredGroup = groups.find(
    (group) => group.id === enteredGroupIdForPopUp
  )

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
              setEnteredGroupIdForPopUp(id)
              setShowGroupPopUp(true)
            }}
          />
        </main>
      </div>

      {/* PopUp`s for this page */}
      {showGroupPopUp && (
        <Group
          onCancel={() => setShowGroupPopUp(false)}
          group={enteredGroup}
          users={users}
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
