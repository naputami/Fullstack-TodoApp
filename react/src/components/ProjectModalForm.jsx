import { useState, useEffect } from "react"

const ProjectModalForm = ({action, handleAddProject, handleEditProject, currentItem}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if(currentItem){
            setName(currentItem.name)
            setDescription(currentItem.description)
        } else {
            setName('')
            setDescription('')
        }
    }, [currentItem])

    const modalProjectEvent = event => {
        event.preventDefault()
        if(action === 'Add'){
            handleAddProject({
                "name": name,
                "description": description
            })
        } else if(action === 'Edit'){
            handleEditProject({
                ...currentItem,
                "name": name,
                "description": description
            })
        }
       
        setName('')
        setDescription('')
        window.project_form.close()
    }

    return(
        <>
            <dialog id="project_form" className="modal">
                <form className="modal-box" onSubmit={modalProjectEvent}>
                <div className="form-control w-full">
                <span className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>window.project_form.close()}>✕</span>
                    <h3 className="font-bold md:text-lg xl:text-xl">{action} project</h3>
                    <label className="label">
                            <span className="label-text md:text-lg xl:text-xl">Project name</span>
                        </label>
                        <input type="text" placeholder="Input project title" className="input input-bordered" value={name} onChange={({target}) => setName(target.value)} required />
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

export default ProjectModalForm