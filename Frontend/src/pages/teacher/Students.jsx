import { useEffect } from 'react'

function Students({ setPageName }) {
  useEffect(() => {
    setPageName('Студенты')
  }, [])

  return <div>Students</div>
}

export default Students
