import { useState } from "react";
const Button = ({ label, activeButton, setActiveButton, setCurrentProject }) => {
    const isActive = activeButton === label;

    const clickEventHandle = event => {
        setActiveButton(event.target.value)
        setCurrentProject(event.target.value)
    }

    return (
      <button
        onClick={clickEventHandle}
        className={`btn btn-sm ${isActive ? 'btn-primary': 'btn-info'}`}
        value={label}>
        {label}
      </button>
    );
};

const ButtonFilter = ({setCurrentProject, projectItems}) => {
    const [activeButton, setActiveButton] = useState('All')

    return(
        <>
            <div className="flex justify-center flex-wrap gap-2 my-2 sm:p-3">
                {projectItems.map(project => <Button key={project.id} label={project.name} setCurrentProject={setCurrentProject} activeButton={activeButton} setActiveButton={setActiveButton} />)}
                <Button label='All' setCurrentProject={setCurrentProject} activeButton={activeButton} setActiveButton={setActiveButton} />
            </div>
        </>
    )
}

export default ButtonFilter