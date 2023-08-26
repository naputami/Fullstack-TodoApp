import img from "../assets/designer-1c.png"
import { Link } from "react-router-dom"
import { useState } from "react"
import Notification from "./Notification"


const RegistrationForm = ({handleRegis, success, message}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');

    const regisAcc = event => {
        event.preventDefault()
        handleRegis({
            "name": name,
            "email": email,
            "password": password
        })

        if(success){
            setName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
        }
     
    }

    const passwordMatchMessage =
    confirmPassword && password !== confirmPassword
      ? 'Passwords do not match'
      : password === confirmPassword && password.length > 0
      ? 'Passwords match'
      : '';


    return(
        <> 
        {success !== null && (
            <Notification success={success} message={message} />
        )}
            <div id="regis-container">
                <div className='img-container'>
                    <img src={img} />
                </div>
                <div className="regis-form w-full">
                    <h1 className="text-2xl md:text-3xl text-center mb-4 title">Registration Form</h1>
                    <form className="w-full" onSubmit={regisAcc}>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text md:text-lg xl:text-xl">Name</span>
                            </label>
                            <input type="text" placeholder="Input your name" className="input input-bordered" value={name} onChange={({target}) => setName(target.value)} />
                            <label className="label">
                                <span className="label-text md:text-lg xl:text-xl">E-mail</span>
                            </label>
                            <input type="text" placeholder="Input your e-mail" className="input input-bordered" value={email} onChange={({target}) => setEmail(target.value)} />
                            <label className="label">
                                <span className="label-text md:text-lg xl:text-xl">Password</span>
                            </label>
                            <input type="password" placeholder="Input your password" className="input input-bordered" value={password}  onChange={({target}) => setPassword(target.value)} />
                            <label className="label">
                                <span className="label-text md:text-lg xl:text-xl">Confirm Password</span>
                            </label>
                            <input type="password" placeholder="Retype your password" className="input input-bordered" value={confirmPassword}  onChange={({target}) => setConfirmPassword(target.value)} />
                            {passwordMatchMessage && (
                            <p className="text-accent text-lg my-3">{passwordMatchMessage}</p>
                            )}
                            <button type="submit" className="btn btn-primary mt-4 w-full">Sign up</button>
                        </div>
                    </form>
                    <div className="link-element mt-3 text-center">
                        <p>Already have an account? <Link to="/login" className="text-primary">Login here</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegistrationForm