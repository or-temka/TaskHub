import { Outlet } from 'react-router-dom'
import StudentHeader from '../components/header/StudentHeader'

function StudentLayout() {
  return (
    <>
      <StudentHeader />
      <Outlet />
    </>
  )
}

export default StudentLayout
