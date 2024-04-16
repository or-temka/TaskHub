import Header from './Header'
import LightButton from '../UI/Buttons/LightButton'

function TeacherHeader() {
  const menuButtons = (
    <>
      <LightButton />
      <LightButton />
    </>
  )

  return <Header menuButtons={menuButtons} />
}

export default TeacherHeader
