/* eslint-disable react/prop-types */
import Todo from './Todo'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import ButtonFilter from './ButtonFilter'
import TaskModalForm from './TaskModalForm'
import Clock from './Clock'


const TodoPage = ({handleLogout, tasks, projects, handleAddTask}) => {
   const [displayTask, setDisplayTask] = useState(tasks)
   const [currentProject, setCurrentProject] = useState('All')
   const [modalTitle, setModalTitle] = useState("")

  const addTaskModal = () => {
    window.task_form.showModal()
    setModalTitle("Add")
  }

  useEffect(()=> {
    if(currentProject === 'All'){
        setDisplayTask(tasks)
    } else {
        const filteredTask = tasks.filter(task =>task.project.name === currentProject)
        setDisplayTask(filteredTask)
    }
  }, [currentProject, tasks])


   const logOutEvent = () => {
    handleLogout()
   }

    return(
        <div className='h-screen container flex flex-col'>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to='/projects'>Project</Link></li>
                        <li><a onClick={logOutEvent}>Logout</a></li>
                    </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">PacToDo</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                    <li className='text-lg'><Link to='/projects'>Project</Link></li>
                    <li className='text-lg'><a onClick={logOutEvent}>Logout</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn btn-primary" onClick={addTaskModal}>NEW TASK</a>
                </div>
            </div>
            <TaskModalForm action={modalTitle} projects={projects} handleAddTask={handleAddTask} />
            <ButtonFilter setCurrentProject={setCurrentProject} projectItems={projects} />
            {displayTask.length === 0 ? <p className='text-2xl text-center my-3'>There is no task to be displayed</p> :
                <div className="container p-6 md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayTask.map(task => <Todo task={task} key={task.id} setModalTitle={setModalTitle}/>)}
                </div>
            }
            <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-auto">
            <div>
               <Clock />
            </div>
            </footer>
        </div>
    )
}

export default TodoPage