import React, {useState} from 'react'
import {auth} from '../../firebase'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {

    const [email, setEmail] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const config = {
            url: 'http://localhost:3000/register/complete',
            handleCodeInApp: true
        }
        auth.sendSignInLinkToEmail(email, config)
            .then(()=>{
                toast.success(`Email sent to ${email}`)
                window.localStorage.setItem("emailForRegistration", email)
            })
            .catch(err=>{
                toast.error(err)
            })
        console.log('after sent')
        
        setEmail("")
    }

    const registerForm = (
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                className="form-control" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                autoFocus
            />
            <br />
            <button type='submit' className='btn btn-raised'>
                Register
            </button>
        </form>
    )

    return (
        <div className="container p-5">
            <div className="row">
                <div className="div.col-md-6 offset-md-3">
                    <h4>Register</h4>
                    <ToastContainer />
                    {registerForm}
                </div>
            </div>
        </div>
    )
}

export default Register;