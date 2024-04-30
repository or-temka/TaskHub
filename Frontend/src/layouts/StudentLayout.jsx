import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import StudentHeader from '../components/header/StudentHeader'

function StudentLayout({ pageName }) {
  const navigate = useNavigate()
  const [showPage, setShowPage] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('userRole') !== 'student') {
      navigate('/signIn', { relative: 'route' })
    } else {
      setShowPage(true)
    }
  }, [])

  if (showPage) {
    return (
      <>
        <StudentHeader pageName={pageName} />
        <Outlet />
      </>
    )
  }
}

export default StudentLayout
