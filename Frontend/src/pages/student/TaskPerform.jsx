import { useEffect } from 'react'

function TaskPerform({ setPageName }) {
  useEffect(() => {
    setPageName('Выполнение задания')
  }, [])

  return <div>TaskPerform</div>
}

export default TaskPerform
