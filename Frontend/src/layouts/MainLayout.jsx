import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import Header from '../components/header/Header'

function MainLayout({ pageName }) {
  const navigate = useNavigate()
  const location = useLocation().pathname
  const [showPage, setShowPage] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('userRole') && location !== '/signIn') {
      setShowPage(true)
      navigate('/signIn', { relative: 'route' })
    } else if (localStorage.getItem('userRole') === 'student') {
      navigate('/student', { relative: 'route' })
    } else if (localStorage.getItem('userRole') === 'teacher') {
      navigate('/teacher', { relative: 'route' })
    } else {
      setShowPage(true)
    }
  }, [])

  if (showPage) {
    return (
      <>
        <Header pageName={pageName} />
        <Outlet />
      </>
    )
  }
}

export default MainLayout
