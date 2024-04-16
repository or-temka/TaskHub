import { Outlet } from 'react-router-dom'
import Header from '../components/header/Header'

function MainLayout({ pageName }) {
  return (
    <>
      <Header pageName={pageName} />
      <Outlet />
    </>
  )
}

export default MainLayout
