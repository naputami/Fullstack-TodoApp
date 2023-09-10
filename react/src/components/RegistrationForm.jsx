import img from "../../public/designer-1c.png"
import { Link } from "react-router-dom"
import { useState } from "react"
import Notification from "./Notification"


const RegistrationForm = ({handleRegis, success, message}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

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

    let passwordMatchMessage =
    confirmPassword && password !== confirmPassword
      ? 'Passwords do not match'
      : password === confirmPassword && password.length > 0
      ? 'Passwords match'
      : ''
    
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@#$%^&+=!]).{8,}$/
    const emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const passwordValidation = passwordRegex.test(password)
    const emailValidation = emailRegex.test(email)
    let passwordValidationMsg = null
    let emaildValidationMsg = null

    if(passwordValidation){
        passwordValidationMsg = 'Nice password!'
    } else {
        if(password.length !== 0){
            passwordValidationMsg = 'Password must be 8+ characters with a mix of numbers, letters, and special characters.'
        }
    }

    
    if(emailValidation){
        emaildValidationMsg = 'Email OK!'
    } else {
        if(email.length !== 0){
            emaildValidationMsg = 'Email is not valid!'
        }
    }

    const buttonInactive = () => {
        if(passwordMatchMessage === 'Passwords do not match'
            | passwordValidationMsg === 'Password must be 8+ characters with a mix of numbers, letters, and special characters.'
            | emaildValidationMsg === 'Email is not valid!') {
            return true
        }

        return false
    }


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
                            <input type="text" placeholder="Input your name" className="input input-bordered" value={name} onChange={({target}) => setName(target.value)} required />
                            <label className="label">
                                <span className="label-text md:text-lg xl:text-xl">E-mail</span>
                            </label>
                            <input type="email" placeholder="Input your e-mail" className="input input-bordered" value={email} onChange={({target}) => setEmail(target.value)} required />
                            {emaildValidationMsg && (
                            <p className="text-accent text-sm my-1">{emaildValidationMsg}</p>
                            )}
                            <label className="label">
                                <span className="label-text md:text-lg xl:text-xl">Password</span>
                            </label>
                            <input type="password" placeholder="Input your password" className="input input-bordered" value={password}  onChange={({target}) => setPassword(target.value)} required />
                            {passwordValidationMsg && (
                            <p className="text-accent text-sm my-1">{passwordValidationMsg}</p>
                            )}
                            <label className="label">
                                <span className="label-text md:text-lg xl:text-xl">Confirm Password</span>
                            </label>
                            <input type="password" placeholder="Retype your password" className="input input-bordered" value={confirmPassword}  onChange={({target}) => setConfirmPassword(target.value)} />
                            {passwordMatchMessage && (
                            <p className="text-accent text-sm my-1">{passwordMatchMessage}</p>
                            )}
                            <button type="submit" disabled={buttonInactive()} className="btn btn-primary mt-4 w-full">Sign up</button>
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