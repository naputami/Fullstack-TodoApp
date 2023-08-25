/* eslint-disable react/prop-types */
import { useState } from "react"
const TaskModalForm = ({action, projects, handleAddTask}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [selectedProject, setSelectedProject] = useState('DEFAULT');

    const modalTaskEvent = event => {
        event.preventDefault()
        handleAddTask({
            "title": title,
            "description": description,
            "due_date": dueDate,
            "project_id": selectedProject
        })

        setTitle('')
        setDescription('')
        setDueDate('')
        setSelectedProject('DEFAULT')
        window.task_form.close()

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
                        <input type="text" placeholder="Input task title" className="input input-bordered" value={title} onChange={({target}) => setTitle(target.value)}/>
                        <label className="label">
                            <span className="label-text md:text-lg xl:text-xl">Due date</span>
                        </label>
                        <input type="date"className="input input-bordered" value={dueDate} onChange={({target}) => setDueDate(target.value)}/>
                        <label className="label">
                            <span className="label-text">Project</span>
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