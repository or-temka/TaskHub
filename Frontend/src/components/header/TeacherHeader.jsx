import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Header from './Header'
import ButtonWithIcon from '../UI/Buttons/ButtonWithIcon'
import { ReactComponent as TasksIcon } from '../../assets/svg/tasks.svg'
import { ReactComponent as GroupIcon } from '../../assets/svg/group-of-people.svg'
import Button from '../UI/Buttons/Button'
import PopUpConfirmation from '../UI/PopUps/PopUpConfirmation'

import { removeUserToken } from '../../utils/userTokenManager'

function TeacherHeader({ pageName }) {
  const navigate = useNavigate()

  const [showExitConfirmPopUp, setShowExitConfirmPopUp] = useState(false)

  const exitHandler = () => {
    removeUserToken()
    localStorage.removeItem('userRole')
    setShowExitConfirmPopUp(false)
    navigate('/signIn', { relative: 'route' })
  }

  const menuButtons = [
    <Link to="./tasks">
      <ButtonWithIcon title="Задания" svgElem={<TasksIcon />} />
    </Link>,
    <Link to="./groups">
      <ButtonWithIcon title="Группы" svgElem={<GroupIcon />} />
    </Link>,
    <Link to="./">
      <ButtonWithIcon title="Студенты" svgElem={<GroupIcon />} />
    </Link>,
    <Button title="Выйти" onClick={() => setShowExitConfirmPopUp(true)} />,
  ]

  return (
    <>
      <Header menuButtons={menuButtons} pageName={pageName} />
      {showExitConfirmPopUp && (
        <PopUpConfirmation
          labelText="Вы действительно хотите выйти из аккаунта?"
          text="Вы в любое время можете войти обратно, но для этого вам потребуется логин и пароль"
          onCancel={() => setShowExitConfirmPopUp(false)}
          onClickBack={() => setShowExitConfirmPopUp(false)}
          onConfirm={exitHandler}
        />
      )}
    </>
  )
}

export default TeacherHeader
