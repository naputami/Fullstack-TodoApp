import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import Home from './components/Home'
import TodoPage from './components/TodoPage'
import ProjectPage from './components/ProjectPage'

function App() {
  // const [count, setCount] = useState(0)

  return (
      <>
        <Routes>
          <Route path='/register' element={<RegistrationForm />}></Route>
          <Route path='/login' element={<LoginForm />}></Route>
          <Route path='/' element={<Home />}></Route>
          <Route path='/todo' element={<TodoPage />}></Route>
          <Route path='/project' element={<ProjectPage />}></Route>
        </Routes>
      </>
  )
}

export default App
