import Header from './Header'
import ButtonWithIcon from '../UI/Buttons/ButtonWithIcon'
import { ReactComponent as TasksIcon } from '../../assets/svg/tasks.svg'
import { ReactComponent as GroupIcon } from '../../assets/svg/group-of-people.svg'
import { Link } from 'react-router-dom'

function TeacherHeader({ pageName }) {
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
  ]

  return <Header menuButtons={menuButtons} pageName={pageName} />
}

export default TeacherHeader
