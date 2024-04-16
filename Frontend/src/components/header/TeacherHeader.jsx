import Header from './Header'
import ButtonWithIcon from '../UI/Buttons/ButtonWithIcon'
import { ReactComponent as TasksIcon } from '../../assets/svg/tasks.svg'
import { ReactComponent as GroupIcon } from '../../assets/svg/group-of-people.svg'

function TeacherHeader({ pageName }) {
  const menuButtons = [
    <ButtonWithIcon title="Задания" svgElem={<TasksIcon />} />,
    <ButtonWithIcon title="Группы" svgElem={<GroupIcon />} />,
    <ButtonWithIcon title="Студенты" svgElem={<GroupIcon />} />,
  ]

  return <Header menuButtons={menuButtons} pageName={pageName} />
}

export default TeacherHeader
