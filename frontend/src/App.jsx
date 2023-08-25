import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
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


  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await projectService.getAll()
      setProjects(projects.data)
    }
    fetchProjects()
  }, [user])

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await taskService.getAll()
      setTask(tasks.data)
      console.log('this is tasks', tasks)
    }
    fetchTasks()
  }, [user])
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      clientService.setToken(user["access token"])
      projectService.setToken(user["access token"])
      taskService.setToken(user["access token"])
    }
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
      clientService.setToken(currentUser["access token"])
      projectService.setToken(currentUser["access token"])
      taskService.setToken(currentUser["access token"])
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
      navigate('/login')
      setSuccess(true)
      setNotifMessafe(userLogout.message)
    }catch(error){
      console.log(error)
    }
  }

  const handleAddProject = async projectObj => {
    try{
      const newProject = await projectService.postProject(projectObj)
      setProjects(projects.concat(newProject.data))
    } catch (error){
      alert("something error, check console")
      console(error)
    }
  }

  const handleDeleteProject = async projectObj => {    
    try{
      const deletedProject = await projectService.deleteProject(projectObj)
      setProjects(projects.filter(project => project.id !== projectObj.id))
    } catch (error){
      alert("something error, check console")
      console.log(error)
    }
  }

  const handleEditProject = async projectObj => {
    try {
      const updatedProject = await projectService.putProject(projectObj)
      setProjects(projects.map(project => project.id !== projectObj.id ? project : projectObj))
    } catch(error){
      alert("something error, check console")
      console.log(error)
    }
  }

  const handleAddTask = async taskObj => {
    try {
      const newTask = await taskService.postTask(taskObj)
      setTask(tasks.concat(newTask.data))
      console.log('this is tasks after post event', tasks)
    }catch(error){
      alert("something error, check console")
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
          <Route path='/' element={<Home />}></Route>
          <Route path='/tasks' element={<TodoPage handleLogout={handleLogout} tasks={tasks} projects={projects} handleAddTask={handleAddTask} />}></Route>
          <Route path='/projects' element={<ProjectPage 
                                            projects={projects} 
                                            handleAddProject={handleAddProject} 
                                            handleDeleteProject={handleDeleteProject}
                                            handleLogout={handleLogout}
                                            handleEditProject={handleEditProject}/>}>                                  
          </Route>
        </Routes>
      </>
  )
}

export default App
