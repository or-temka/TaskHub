import { Link } from 'react-router-dom'
import { useState } from 'react'

import ButtonWithIcon from '../UI/Buttons/ButtonWithIcon'
import Header from './Header'
import { ReactComponent as TasksIcon } from '../../assets/svg/tasks.svg'
import UserProfile from '../student/UserProfile'

function StudentHeader({ user, userGroup, pageName }) {
  const [showProfile, setShowProfile] = useState(false)

  const userGroupName = userGroup ? userGroup.name : 'Не добавлена в группу'

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
