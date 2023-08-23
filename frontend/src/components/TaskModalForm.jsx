/* eslint-disable react/prop-types */
const TaskModalForm = ({action}) => {

    return(
        <>
            <dialog id="task_form" className="modal">
                <form className="modal-box">
                <div className="form-control w-full">
                <span className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>window.task_form.close()}>✕</span>
                    <h3 className="font-bold md:text-lg xl:text-xl">{action} task</h3>
                    <label className="label">
                            <span className="label-text md:text-lg xl:text-xl">Task title</span>
                        </label>
                        <input type="text" placeholder="Input task title" className="input input-bordered" />
                        <label className="label">
                            <span className="label-text md:text-lg xl:text-xl">Due date</span>
                        </label>
                        <input type="date"className="input input-bordered" />
                        <label className="label">
                            <span className="label-text md:text-lg xl:text-xl">Description</span>
                        </label>
                        <textarea className="textarea textarea-bordered" placeholder="Input description"></textarea>
                        <button type="submit" className="btn btn-primary mt-4 w-full">Save</button>
                </div>
                </form>
            </dialog>
        </>
    )
}

export default TaskModalForm