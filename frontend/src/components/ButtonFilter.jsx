/* eslint-disable react/prop-types */
const ButtonFilter = ({filterProject, setDisplay, projectItems, allTask}) => {
    return(
        <>
            <div className="flex justify-center gap-2 my-3">
                {projectItems.map(project => <button key={project.id} 
                className="btn btn-sm btn-info"
                onClick={() => filterProject(project.name)}>{project.name}</button>)}
                <button className="btn btn-sm btn-primary"
                onClick={() => setDisplay(allTask)}>All</button>
            </div>
        </>
    )
}

export default ButtonFilter