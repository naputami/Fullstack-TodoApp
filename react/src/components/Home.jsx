import { Link } from "react-router-dom"
import img from "../../public/digital-nomad-3.png"

const Home = ({user}) => {
    return (
        <>
            <div className="container h-screen flex items-center justify-center flex-col">
                <h1 className="text-2xl md:text-3xl lg:text-4xl title">Welcome to PacToDo App</h1>
                <p className="text-lg md:text-xl lg:text-2xl">Organizing your task easily</p>
                <Link to={user? '/tasks' : '/login'}><button className="btn btn-accent sm:btn-sm md:btn-md lg:btn-lg my-6">Get Started</button></Link>
                <div className="flex justify-center">
                    <img src={img} className="sm:w-full md:w-3/5" />
                </div>
            </div>
        </>
    )
}

export default Home