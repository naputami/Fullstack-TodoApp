import DeleteConfirmation from './DeleteConfirmation'

const formatDate = (inputDate) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    const [month, day, year] = new Date(inputDate).toLocaleDateString('en-US', options).split('/')
    return `${day}/${month}/${year}`

}

const Todo = ({task, handleDeleteTask, handleUpdateTask, handleEditClick}) => {

    const editTaskModal = () => {
        window.task_form.showModal()
        handleEditClick(task)
    }

    const toggleChangeStatus = () => {
        const changedTask = {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "due_date": task.due_date,
            "project_id": task.project.id,
            "is_done": !task.is_done
        }

        handleUpdateTask(changedTask)
    }



    return(
    <>
        <div className={`bg-base-100 shadow-xl border-secondary border-solid border-2 rounded-md text-left p-3 mb-3 ${task.is_done ? "line-through": ""}`}>
            <h3 className="text-lg title mb-2">{task.title}<div className="badge badge-secondary ml-2">{task.project.name}</div></h3>
            <p className="text-sm text-accent">Due date: {formatDate(task.due_date)}</p>
            <p className="text-sm">{task.description}</p>
            <div className="button-group mt-2">
            <button className={`btn ${task.is_done ? 'btn-info' : 'btn-success'} btn-sm mr-2`} onClick={toggleChangeStatus}>{task.is_done ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                </svg>
                ): (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>)}
            </button>
            <button className="btn btn-accent btn-sm mr-2" onClick={editTaskModal}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </button>
            <DeleteConfirmation item={task} handleDelete={handleDeleteTask} itemType="task" />
        </div>
        </div>
    </>
    )
}

export default Todo