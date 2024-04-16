import { BrowserRouter, Routes, Route } from 'react-router-dom'

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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<MainPage />}></Route>
            <Route path="signIn" element={<SignIn />}></Route>
          </Route>
          <Route path="student" element={<StudentLayout />}>
            <Route index element={<Tasks />}></Route>
            <Route path="task" element={<Task />}></Route>
            <Route path="taskPerform" element={<TaskPerform />}></Route>
          </Route>
          <Route path="teacher" element={<TeacherLayout />}>
            <Route index element={<Students />}></Route>
            <Route path="groups" element={<Groups />}></Route>
            <Route path="tasks" element={<TeacherTasks />}></Route>
            <Route path="task" element={<TaskInfo />}></Route>
          </Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
