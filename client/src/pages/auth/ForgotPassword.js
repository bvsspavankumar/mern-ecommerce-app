import React, {useState, useEffect} from 'react'
import {auth} from '../../firebase'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'

const ForgotPassword = ({history}) => {

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const {user} = useSelector(state=>({...state}))

    useEffect(() => {
        if (user && user.token) history.push('/')
    }, [user, history])

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true
        }
        auth.sendPasswordResetEmail(email, config)
            .then(()=>{
                toast.success(`Email sent to ${email}`)
                history.push('/login')
            })
            .catch(err=>{
                console.log('error')
                toast.error(`Error: ${err.message}`)
                setLoading(false)
            })
    }
    return (
        <div className='container col-md-6 offset-md-3 p-5'>
            {loading?<h3>Loading...</h3>:<h3>ForgotPassword</h3>}
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
                <button 
                    type='submit' 
                    className='btn btn-raised'
                    disabled={!email}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default ForgotPassword