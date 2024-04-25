import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'

import MainLayout from './layouts/MainLayout'
import StudentLayout from './layouts/StudentLayout'
import TeacherLayout from './layouts/TeacherLayout'
import PageNotFound from './pages/PageNotFound'
import MainPage from './pages/MainPage'
import SignIn from './pages/SignIn'
import Tasks from './pages/student/Tasks'
import Task from './pages/student/Task'
import TaskPerform from './pages/student/TaskPerform'
import Students from './pages/teacher/Students'
import Groups from './pages/teacher/Groups'
import TeacherTasks from './pages/teacher/Tasks'
import TaskInfo from './pages/teacher/TaskInfo'

import { SITE_NAME } from './Variables'

function App() {
  //Для изменения названия страницы
  const [pageName, setPageName] = useState('')
  useEffect(() => {
    document.title = pageName ? SITE_NAME + ' | ' + pageName : SITE_NAME
  }, [pageName])

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout pageName={pageName} />}>
            <Route
              index
              element={<MainPage setPageName={setPageName} />}
            ></Route>
            <Route
              path="signIn"
              element={<SignIn setPageName={setPageName} />}
            ></Route>
          </Route>
          <Route path="student" element={<StudentLayout pageName={pageName} />}>
            <Route index element={<Tasks setPageName={setPageName} />}></Route>
            <Route
              path="task/:taskId"
              element={<Task setPageName={setPageName} />}
            ></Route>
            <Route
              path="taskPerform/:taskId"
              element={<TaskPerform setPageName={setPageName} />}
            ></Route>
          </Route>
          <Route path="teacher" element={<TeacherLayout pageName={pageName} />}>
            <Route
              index
              element={<Students setPageName={setPageName} />}
            ></Route>
            <Route
              path="groups"
              element={<Groups setPageName={setPageName} />}
            ></Route>
            <Route
              path="tasks"
              element={<TeacherTasks setPageName={setPageName} />}
            ></Route>
            <Route
              path="task/:taskId"
              element={<TaskInfo setPageName={setPageName} />}
            ></Route>
          </Route>
          <Route
            path="*"
            element={<PageNotFound setPageName={setPageName} />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
