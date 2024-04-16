import ButtonWithIcon from '../UI/Buttons/ButtonWithIcon'
import Header from './Header'

function StudentHeader({ pageName }) {
  const menuButtons = [<ButtonWithIcon />, <ButtonWithIcon />]

  return <Header profileId={1} menuButtons={menuButtons} pageName={pageName} />
}

export default StudentHeader
