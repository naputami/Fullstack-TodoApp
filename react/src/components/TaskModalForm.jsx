import { useState, useEffect } from "react"

const stringToDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getUTCFullYear()
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
    const day = date.getUTCDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
}
const TaskModalForm = ({action, projects, handleAddTask, task, handleEditTask}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [selectedProject, setSelectedProject] = useState('DEFAULT');

    useEffect(() => {
        if(task){
        setTitle(task.title)
        setDescription(task.description)
        setDueDate(stringToDate(task.due_date))
        setSelectedProject(task.project.id)
        } else {
            setTitle('')
            setDescription('')
            setDueDate('')
            setSelectedProject('DEFAULT')
        }
    }, [task])

    const modalTaskEvent = event => {
        event.preventDefault()
        if(selectedProject === 'DEFAULT'){
            alert('Please choose available project!')
        } else {
            if(action === 'Add'){
                handleAddTask({
                    "title": title,
                    "description": description,
                    "due_date": dueDate,
                    "project_id": selectedProject
                })
            } else if(action === 'Edit'){
                handleEditTask({
                    "title": title,
                    "description": description,
                    "due_date": dueDate,
                    "project_id": selectedProject,
                    "is_done": Number(task.is_done),
                    "id": task.id
                })
            }

            
        setTitle('')
        setDescription('')
        setDueDate('')
        setSelectedProject('DEFAULT')
        window.task_form.close()


        }
    }

    return(
        <>
            <dialog id="task_form" className="modal">
                <form className="modal-box" onSubmit={modalTaskEvent}>
                <div className="form-control w-full">
                <span className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>window.task_form.close()}>✕</span>
                    <h3 className="font-bold md:text-lg xl:text-xl">{action} task</h3>
                    <label className="label">
                            <span className="label-text md:text-lg xl:text-xl">Task title</span>
                        </label>
                        <input type="text" placeholder="Input task title" className="input input-bordered" value={title} onChange={({target}) => setTitle(target.value)} required/>
                        <label className="label">
                            <span className="label-text md:text-lg xl:text-xl">Due date</span>
                        </label>
                        <input type="date"className="input input-bordered" value={dueDate} onChange={({target}) => setDueDate(target.value)} required/>
                        <label className="label">
                            <span className="label-text md:text-lg xl:text-xl">Project</span>
                        </label>
                        <select className="select select-bordered" value={selectedProject} onChange={({target}) => setSelectedProject(target.value)}>
                            {projects.length === 0 ? (<option value="DEFAULT">Add a project first!</option>) : (
                                <>
                                    <option value="DEFAULT">Pick one</option>
                                    {projects.map(project =>  <option key={project.id} value={project.id}>{project.name}</option>)}
                                </>
                            )}
                        </select>
                        <label className="label">
                            <span className="label-text md:text-lg xl:text-xl">Description</span>
                        </label>
                        <textarea className="textarea textarea-bordered" placeholder="Input description" value={description} onChange={({target}) => setDescription(target.value)}></textarea>
                        <button type="submit" className="btn btn-primary mt-4 w-full">Save</button>
                </div>
                </form>
            </dialog>
        </>
    )
}

export default TaskModalForm