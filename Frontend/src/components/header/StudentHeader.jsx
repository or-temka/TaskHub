import ButtonWithIcon from '../UI/Buttons/ButtonWithIcon'
import Header from './Header'
import { ReactComponent as TasksIcon } from '../../assets/svg/tasks.svg'
import { Link } from 'react-router-dom'

function StudentHeader({ pageName }) {
  const menuButtons = [
    <Link to="./">
      <ButtonWithIcon title="Задания" svgElem={<TasksIcon />} />
    </Link>,
  ]

  return <Header profileId={1} menuButtons={menuButtons} pageName={pageName} />
}

export default StudentHeader
