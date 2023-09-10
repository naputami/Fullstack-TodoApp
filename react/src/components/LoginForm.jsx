import { useState } from "react"
import img from "../../public/checklist-88.png"
import { Link } from "react-router-dom"
import Notification from "./Notification"

const LoginForm = ({handleLogin, success, message}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginEvent = event => {
        event.preventDefault()
        handleLogin({
            "email": email,
            "password": password
        })

        if(success){
            setEmail('')
            setPassword('')
        }

    }

    return(
    <>
        {success !== null && (
                <Notification success={success} message={message} />
            )}
        <div id='login-container'>
            <div className='img-container'>
                <img src={img} />
            </div>
            <div className='login-form w-full'>
            <h1 className="text-2xl md:text-3xl text-center mb-4 title">PacToDo Login</h1>
            <form className="w-full" onSubmit={loginEvent}>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text md:text-lg xl:text-xl">E-mail</span>
                    </label>
                    <input type="text" placeholder="example@gmail.com" className="input input-bordered" value={email} onChange={({target}) => setEmail(target.value)} required />
                    <label className="label">
                        <span className="label-text md:text-lg xl:text-xl">Password</span>
                    </label>
                    <input type="password" placeholder="Input password here" className="input input-bordered" value={password} onChange={({target}) => setPassword(target.value)} required />
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