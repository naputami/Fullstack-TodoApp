/* eslint-disable react/prop-types */
import DeleteConfirmation from './DeleteProjectConfirmation'

const Todo = ({task, setModalTitle}) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your form submission logic here
        // closeModal();
    };

    const editTaskModal = () => {
        window.task_form.showModal()
        setModalTitle("Edit")
    }

    return(
    <>
        <div className={`bg-base-100 shadow-xl border-secondary border-solid border-2 rounded-md text-left p-3 mb-3 ${task.is_done ? "line-through": ""}`}>
            <h3 className="text-lg title mb-2">{task.title}<div className="badge badge-secondary ml-2">{task.project.name}</div></h3>
            <p className="text-sm text-accent">Due date: {task.due_date}</p>
            <p className="text-sm">{task.description}</p>
            <div className="button-group mt-2">
            <button className="btn btn-success btn-sm mr-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            <button className="btn btn-accent btn-sm mr-2" onClick={editTaskModal}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </button>
            <DeleteConfirmation />
        </div>
        </div>
    </>
    )
}

export default Todo