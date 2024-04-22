import { Link } from 'react-router-dom'
import { useState } from 'react'

import ButtonWithIcon from '../UI/Buttons/ButtonWithIcon'
import Header from './Header'
import { ReactComponent as TasksIcon } from '../../assets/svg/tasks.svg'
import UserProfile from '../student/UserProfile'

import users from '../../data/users'
import groups from '../../data/groups'

function StudentHeader({ pageName }) {
  const [showProfile, setShowProfile] = useState(false)

  const profileId = 1
  const user = users.find((user) => user.id === profileId)
  const userGroupName = groups.find((group) => group.id === user.groupId).name

  const menuButtons = [
    <Link to="./">
      <ButtonWithIcon title="Задания" svgElem={<TasksIcon />} />
    </Link>,
  ]

  return (
    <>
      <Header
        user={user}
        menuButtons={menuButtons}
        pageName={pageName}
        onClickProfileButton={() => setShowProfile(true)}
      />
      {showProfile && (
        <UserProfile
          user={user}
          userGroupName={userGroupName}
          onCancel={() => setShowProfile(false)}
        />
      )}
    </>
  )
}

export default StudentHeader
