import { Outlet } from 'react-router-dom'
import Header from '../components/header/Header'

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default MainLayout
