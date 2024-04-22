import { useEffect } from 'react'

function Groups({ setPageName }) {
  useEffect(() => {
    setPageName('Группы')
  }, [])

  return <div>Groups</div>
}

export default Groups
