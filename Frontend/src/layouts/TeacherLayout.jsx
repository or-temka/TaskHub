import { Outlet } from 'react-router-dom'
import TeacherHeader from '../components/header/TeacherHeader'

function TeacherLayout({ pageName }) {
  return (
    <>
      <TeacherHeader pageName={pageName} />
      <Outlet />
    </>
  )
}

export default TeacherLayout
