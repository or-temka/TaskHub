import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import StudentHeader from '../components/header/StudentHeader'
import SpinLoader from '../components/UI/Loaders/SpinLoader'

import { fetchUserData, fetchUserGroup } from '../utils/fetchData/student/user'

function StudentLayout({ pageName }) {
  const navigate = useNavigate()
  const [showPage, setShowPage] = useState(false)

  const [user, setUser] = useState()
  const [userGroup, setUserGroup] = useState()

  const [loading, setLoading] = useState(4)

  // Получение данных о студенте
  useEffect(() => {
    if (localStorage.getItem('userRole') !== 'student') {
      navigate('/signIn', { relative: 'route' })
    } else {
      setShowPage(true)
    }

    fetchUserData()
      .then((res) => {
        setUser(res)
        setLoading((prev) => prev - 1)
      })
      .catch((err) => console.log(err))

    fetchUserGroup()
      .then((res) => {
        setUserGroup(res)
        setLoading((prev) => prev - 1)
      })
      .catch((err) => {
        setUserGroup(null)
        setLoading((prev) => prev - 1)
        console.log(err)
      })
  }, [])

  if (loading > 0) {
    return (
      <div className="wrapper spinLoaderWrapper">
        <SpinLoader />
      </div>
    )
  }

  if (showPage) {
    return (
      <>
        <StudentHeader
          pageName={pageName}
          user={user}
          setUser={setUser}
          userGroup={userGroup}
          setUserGroup={setUserGroup}
        />
        <Outlet
          user={user}
          setUser={setUser}
          userGroup={userGroup}
          setUserGroup={setUserGroup}
        />
      </>
    )
  }
}

export default StudentLayout
