import { Outlet } from 'react-router-dom'
import TeacherHeader from '../components/header/TeacherHeader'

function TeacherLayout() {
  return (
    <>
      <TeacherHeader />
      <Outlet />
    </>
  )
}

export default TeacherLayout
