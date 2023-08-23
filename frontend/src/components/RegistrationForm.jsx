import img from "../assets/designer-1c.png"
import { Link } from "react-router-dom"


const RegistrationForm = () => {
    return(
        <>
            <div id="regis-container">
                <div className='img-container'>
                    <img src={img} />
                </div>
                <div className="regis-form w-full">
                    <h1 className="text-2xl md:text-3xl text-center mb-4 title">Registration Form</h1>
                    <form className="w-full">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text md:text-lg xl:text-xl">Name</span>
                            </label>
                            <input type="text" placeholder="Input your name" className="input input-bordered" />
                            <label className="label">
                                <span className="label-text md:text-lg xl:text-xl">E-mail</span>
                            </label>
                            <input type="text" placeholder="Input your e-amil" className="input input-bordered" />
                            <label className="label">
                                <span className="label-text md:text-lg xl:text-xl">Password</span>
                            </label>
                            <input type="text" placeholder="Input your password" className="input input-bordered" />
                            <label className="label">
                                <span className="label-text md:text-lg xl:text-xl">Confirm Password</span>
                            </label>
                            <input type="text" placeholder="Retype your password" className="input input-bordered" />
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