import LightButton from '../UI/Buttons/LightButton'
import Header from './Header'

function StudentHeader() {
  const menuButtons = (
    <>
      <LightButton />
      <LightButton />
    </>
  )

  return <Header profileId={0} menuButtons={menuButtons} />
}

export default StudentHeader
