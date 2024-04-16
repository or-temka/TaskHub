import LightButton from '../UI/Buttons/LightButton'
import Header from './Header'

function StudentHeader({ pageName }) {
  const menuButtons = [<LightButton />, <LightButton />]

  return <Header profileId={1} menuButtons={menuButtons} pageName={pageName} />
}

export default StudentHeader
