import { useEffect } from 'react'

function TaskInfo({ setPageName }) {
  useEffect(() => {
    setPageName('Задание')
  }, [])

  return <div>TaskInfo</div>
}

export default TaskInfo
