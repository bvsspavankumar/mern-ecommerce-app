import React, {useState, useEffect} from 'react'
import {auth} from '../../firebase'
import {toast} from 'react-toastify'
import {useDispatch} from 'react-redux'

import {createOrUpdateUser} from '../../functions/auth'

const RegisterComplete = ({history}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email || !password) {
            toast.error('Email and passowrd is required')
            return
        }
        if (password.length < 6) {
            toast.error('Password should be atleat 6 characters')
            return
        }
        auth.signInWithEmailLink(email, window.location.href)
            .then(async (result)=>{
                if (result.user.emailVerified) {
                    window.localStorage.removeItem('emailForRegistration')
                    let user = auth.currentUser
                    await user.updatePassword(password)
                    const token = await user.getIdTokenResult()
                    createOrUpdateUser(token.token)
                    .then(res=>{
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: token.token,
                                role: res.data.role,
                                _id: res.data._id,
                            }
                        })
                    })
                    history.push('/')
                    toast.success('Registration successful')
                } else {
                    throw new Error("Invalid email")
                }
            })
            .catch(err=>toast.error(`Error: ${err.message}`))
    }

    const completeRegisterForm = (
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                className="form-control" 
                value={email}
                disabled
            />
            <br />
            <input
                type='password'
                className="form-control"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"
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
                    <h4>Complete Registration</h4>
                    {completeRegisterForm}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete;