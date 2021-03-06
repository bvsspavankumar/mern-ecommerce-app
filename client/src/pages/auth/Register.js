import React, {useState, useEffect} from 'react'
import {auth} from '../../firebase'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'

const Register = ({history}) => {

    const [email, setEmail] = useState("")
    const {user} = useSelector(state=>({...state}))

    useEffect(() => {
        if (user && user.token) history.push('/')
    }, [user, history])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }
        console.log(config.url)
        auth.sendSignInLinkToEmail(email, config)
            .then(()=>{
                toast.success(`Email sent to ${email}`)
                window.localStorage.setItem("emailForRegistration", email)
            })
            .catch(err=>{
                console.log('error')
                toast.error(`Error: ${err.message}`)
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
                placeholder="Your Email"
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
                    {registerForm}
                </div>
            </div>
        </div>
    )
}

export default Register;