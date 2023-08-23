import img from "../assets/checklist-88.png"
import { Link } from "react-router-dom"
const LoginForm = () => {
    return(
    <>
        <div id='login-container'>
            <div className='img-container'>
                <img src={img} />
            </div>
            <div className='login-form w-full'>
            <h1 className="text-2xl md:text-3xl text-center mb-4 title">PacToDo Login</h1>
            <form className="w-full">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text md:text-lg xl:text-xl">E-mail</span>
                    </label>
                    <input type="text" placeholder="example@gmail.com" className="input input-bordered" />
                    <label className="label">
                        <span className="label-text md:text-lg xl:text-xl">Password</span>
                    </label>
                    <input type="password" placeholder="Input password here" className="input input-bordered" />
                    <button type="submit" className="btn btn-primary mt-4 w-full">Login</button>
                </div>
            </form>
            <div className="link-element mt-3 text-center">
                <p>Dont have any account? <Link to="/register" className="text-primary">Sign up here</Link></p>
            </div>
            </div>
        </div>
    </>
    )
}

export default LoginForm