import Project from './Project'
import { useState } from 'react'
import { Link } from "react-router-dom"
import ProjectModalForm from './ProjectModalForm'
import Clock from './Clock'

const projectDummy = [
    {
        "id": 1,
        "name": "coding",
        "description": "lorem ipsum dolor sir amet"
    },
    {
        "id": 2,
        "name": "home",
        "description": "lorem ipsum dolor sir amet"
    }
]

const ProjectPage = () => {
    const [modalTitle, setModalTitle] = useState("")

    const addProjectModal = () => {
        window.project_form.showModal()
        setModalTitle("Add")
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
                        <li><Link to='/todo'>Task</Link></li>
                        <li><a>Logout</a></li>
                    </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">PacToDo</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                    <li><Link to='/todo'>Task</Link></li>
                    <li><a>Logout</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn btn-primary" onClick={addProjectModal}>NEW PROJECT</a>
                </div>
            </div>
            <ProjectModalForm action={modalTitle} />
            <div className="container p-6 md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectDummy.map(project => <Project project={project} key={project.id} setModalTitle={setModalTitle}/>)}
            </div>
            <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-auto">
            <div>
               <Clock />
            </div>
            </footer>
        </div>
    )
}

export default ProjectPage