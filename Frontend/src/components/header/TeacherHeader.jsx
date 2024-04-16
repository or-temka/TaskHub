import Header from './Header'
import ButtonWithIcon from '../UI/Buttons/ButtonWithIcon'

function TeacherHeader({ pageName }) {
  const menuButtons = [<ButtonWithIcon />, <ButtonWithIcon />]

  return <Header menuButtons={menuButtons} pageName={pageName} />
}

export default TeacherHeader
