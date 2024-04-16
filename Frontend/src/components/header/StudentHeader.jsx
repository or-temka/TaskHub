import ButtonWithIcon from '../UI/Buttons/ButtonWithIcon'
import Header from './Header'
import { ReactComponent as TasksIcon } from '../../assets/svg/tasks.svg'

function StudentHeader({ pageName }) {
  const menuButtons = [
    <ButtonWithIcon title="Задания" svgElem={<TasksIcon />} />,
  ]

  return <Header profileId={1} menuButtons={menuButtons} pageName={pageName} />
}

export default StudentHeader
