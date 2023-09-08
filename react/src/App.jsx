/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import Home from './components/Home'
import TodoPage from './components/TodoPage'
import ProjectPage from './components/ProjectPage'
import registerService from './services/register'
import clientService from './services/client'
import projectService from './services/projects'
import taskService from './services/tasks'

function App() {
  const [tasks, setTask] = useState([])
  const [projects, setProjects] = useState([])
  const [user, setUser] = useState(null)
  const [success, setSuccess] = useState(null)
  const [notifMessage, setNotifMessafe] = useState('')

  const navigate = useNavigate()

  const getToken = (token) => {
      clientService.setToken(token["access token"])
      clientService.setRefresh(token["refresh token"])
      projectService.setToken(token["access token"])
      taskService.setToken(token["access token"])
  }


  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await projectService.getAll()
      setProjects(projects.data)
    }
  
    const fetchTasks = async () => {
      const tasks = await taskService.getAll()
      setTask(tasks.data.sort((a,b) => a.is_done - b.is_done))
    }
  
    if (user) {
      fetchProjects()
      fetchTasks()
    }
  }, [user])
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      getToken(user)
    }
  }, [])
  
  useEffect(() => {
    const getNewAccessToken = async () => {
      try{
        if(localStorage.loggedAppUser){
          const newAccessToken = await clientService.refreshAccessToken()
          const user = JSON.parse(localStorage.getItem('loggedAppUser'));
          user["access token"] = newAccessToken["access token"]
          window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
          getToken(user)
          setUser(user)
          console.log('Refresh token success!')
        }
      } catch(error){
        console.log('Refresh token failed!')
        console.log(error)
      }
  
    }
      const refreshTokenInterval = 15 * 60 * 1000
      getNewAccessToken()
      const intervalId = setInterval(getNewAccessToken, refreshTokenInterval);
      return () => clearInterval(intervalId);
  }, [])


  const handleRegis = async userObj => {
    try {
      const registeredAcc = await registerService.register(userObj)
      setSuccess(true)
      setNotifMessafe(registeredAcc.data.message)
    } catch(error) {
      console.log(error)
      setSuccess(false)
      setNotifMessafe(error.response.data.message)
    }
 
  }

  const handleLogin = async userObj => {
    try{
      const currentUser = await clientService.login(userObj)
      getToken(currentUser)
      window.localStorage.setItem('loggedAppUser', JSON.stringify(currentUser))
      setUser(currentUser)
      navigate('/tasks')
    }catch(error){
      console.log(error)
      setSuccess(false)
      setNotifMessafe(error.response.data.message)
    }
  }

  const handleLogout = async() => {
    try{
      const userLogout = await clientService.logout()
      window.localStorage.removeItem('loggedAppUser')
      setProjects([])
      setTask([])
      setUser(null)
      navigate('/login')
      setSuccess(true)
      setNotifMessafe(userLogout.message)
    }catch(error){
      alert("something error, Please try again!")
      console(error)
      
    }
  }

  const handleAddProject = async projectObj => {
    try{
      const newProject = await projectService.postProject(projectObj)
      setProjects(projects.concat(newProject.data))
    } catch (error){
      alert("something error, Please try again!")
      console.log(error)
    }
  }

  const handleDeleteProject = async projectObj => {    
    try{
      const deletedProject = await projectService.deleteProject(projectObj)
      setProjects(projects.filter(project => project.id !== projectObj.id))
      setTask(tasks.filter(task => task.project.id !== projectObj.id))
    } catch (error){
      alert("something error, Please try again!")
      console.log(error)
    }
  }

  const handleEditProject = async projectObj => {
    try {
      const updatedProject = await projectService.putProject(projectObj)
      setProjects(projects.map(project => project.id !== projectObj.id ? project : projectObj))
    } catch(error){
      alert("something error, Please try again!")
      console.log(error)
    }
  }

  const handleAddTask = async taskObj => {
    try {
      const newTask = await taskService.postTask(taskObj)
      setTask(tasks.concat(newTask.data).sort((a,b) => a.is_done - b.is_done))
    }catch(error){
      alert("something error, Please try again!")
      console.log(error)
    }
  }

  const handleDeleteTask = async taskObj => {
    try{
      const deleteTask = await taskService.deleteTask(taskObj)
      setTask(tasks.filter(task => task.id !== taskObj.id))
    }catch(error){
      alert("something error, Please try again!")
      console.log(error)
    }
  }

  const handleUpdateTask = async taskObj => {
    try{
      const updateTask = await taskService.putTask(taskObj)
      setTask(tasks.map(task => task.id !== taskObj.id ? task : updateTask.data).sort((a,b) => a.is_done - b.is_done))
    }catch(error){
      alert("something error, Please try again!")
      console.log(error)
    }
  }

  setTimeout(() => {
    setSuccess(null);
  }, 5000);

  return (
      <>
        <Routes>
          <Route path='/register' element={<RegistrationForm handleRegis={handleRegis} message={notifMessage} success={success}/>}></Route>
          <Route path='/login' element={<LoginForm handleLogin={handleLogin} message={notifMessage} success={success} />}></Route>
          <Route path='/' element={<Home user={user} />}></Route>
          <Route path='/tasks' element={localStorage.loggedAppUser? <TodoPage handleLogout={handleLogout} tasks={tasks} projects={projects} handleAddTask={handleAddTask} handleDeleteTask={handleDeleteTask} handleUpdateTask={handleUpdateTask} /> : <Navigate replace to='/login'/>}> </Route>
          <Route path='/projects' element={localStorage.loggedAppUser? <ProjectPage projects={projects} handleAddProject={handleAddProject} handleDeleteProject={handleDeleteProject} handleLogout={handleLogout}handleEditProject={handleEditProject}/> : <Navigate replace to='/login'/>}></Route>
        </Routes>
      </>
  )
}

export default App
