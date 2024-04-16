import Header from './Header'
import LightButton from '../UI/Buttons/LightButton'

function TeacherHeader({ pageName }) {
  const menuButtons = [<LightButton />, <LightButton />]

  return <Header menuButtons={menuButtons} pageName={pageName} />
}

export default TeacherHeader
