import Todo from './Todo'
import { useState } from 'react'
import { Link } from "react-router-dom"
import ButtonFilter from './ButtonFilter'
import TaskModalForm from './TaskModalForm'
import Clock from './Clock'


const taskDummy = [
    {
        "id": 1,
        "title": "Learning js",
        "description": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque vero exercitationem a soluta neque inventore quibusdam nobis perferendis praesentium labore?",
        "project": {
            "id:": 1,
            "name": "coding"
        },
        "due_date": "2023-08-22",
        "is_done": true,
        "user": {
            "id": 1,
            "name": "Andi"
        }
    },
    {
        "id": 2,
        "title": "Learning c++",
        "description": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque vero exercitationem a soluta neque inventore quibusdam nobis perferendis praesentium labore?",
        "project": {
            "id:": 1,
            "name": "coding"
        },
        "due_date": "2023-08-22",
        "is_done": false,
        "user": {
            "id": 1,
            "name": "Andi"
        }
    },
    {
        "id": 3,
        "title": "Learning react",
        "description": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque vero exercitationem a soluta neque inventore quibusdam nobis perferendis praesentium labore?",
        "project": {
            "id:": 1,
            "name": "coding"
        },
        "due_date": "2023-08-22",
        "is_done": false,
        "user": {
            "id": 1,
            "name": "Andi"
        }
    },
    {
        "id": 4,
        "title": "cleaning bedroom",
        "description": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque vero exercitationem a soluta neque inventore quibusdam nobis perferendis praesentium labore?",
        "project": {
            "id:": 2,
            "name": "home"
        },
        "due_date": "2023-08-22",
        "is_done": false,
        "user": {
            "id": 1,
            "name": "Andi"
        }
    },
    {
        "id": 5,
        "title": "Baking cake",
        "description": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque vero exercitationem a soluta neque inventore quibusdam nobis perferendis praesentium labore?",
        "project": {
            "id:": 2,
            "name": "home"
        },
        "due_date": "2023-08-22",
        "is_done": false,
        "user": {
            "id": 1,
            "name": "Andi"
        }
    }
]

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

const TodoPage = () => {
   const [displayTask, setDisplayTask] = useState(taskDummy)
   const [modalTitle, setModalTitle] = useState("")

  const addTaskModal = () => {
    window.task_form.showModal()
    setModalTitle("Add")
   }

   const filterProject = (project) => {
    const filteredItem = taskDummy.filter((task) => task.project.name === project)
    setDisplayTask(filteredItem)
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
                        <li><Link to='/project'>Project</Link></li>
                        <li><a>Logout</a></li>
                    </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">PacToDo</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                    <li><Link to='/project'>Project</Link></li>
                    <li><a>Logout</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn btn-primary" onClick={addTaskModal}>NEW TASK</a>
                </div>
            </div>
            <TaskModalForm action={modalTitle} />
            <ButtonFilter filterProject={filterProject} setDisplay={setDisplayTask} projectItems={projectDummy} allTask={taskDummy} />
            <div className="container p-6 md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayTask.map(task => <Todo task={task} key={task.id} setModalTitle={setModalTitle}/>)}
            </div>
            <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-auto">
            <div>
               <Clock />
            </div>
            </footer>
        </div>
    )
}

export default TodoPage