import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import TeacherHeader from '../components/header/TeacherHeader'

function TeacherLayout({ pageName }) {
  const navigate = useNavigate()
  const [showPage, setShowPage] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('userRole') !== 'teacher') {
      navigate('/signIn', { relative: 'route' })
    } else {
      setShowPage(true)
    }
  }, [])

  if (showPage) {
    return (
      <>
        <TeacherHeader pageName={pageName} />
        <Outlet />
      </>
    )
  }
}

export default TeacherLayout
