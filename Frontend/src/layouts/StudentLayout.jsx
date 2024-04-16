import { Outlet } from 'react-router-dom'
import StudentHeader from '../components/header/StudentHeader'

function StudentLayout({ pageName }) {
  return (
    <>
      <StudentHeader pageName={pageName} />
      <Outlet />
    </>
  )
}

export default StudentLayout
