import React, {useState, useEffect} from 'react'
import {auth, googleAuthProvider} from '../../firebase'
import {toast} from 'react-toastify'
import {Button} from 'antd'
import {GoogleOutlined, MailOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import {createOrUpdateUser} from '../../functions/auth'

const Login = ({history}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const {user} = useSelector(state=>({...state}))

    useEffect(() => {
        if (user && user.token) history.push('/')
    }, [user])

    const loginHandler = (user) => {
        toast.success(`Login successful`)
        user.getIdTokenResult()
            .then(token=>createOrUpdateUser(token.token))
            .then(async res=>{
                const token = await user.getIdTokenResult()
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
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        auth.signInWithEmailAndPassword(email.trim(), password)
            .then(({user})=>loginHandler(user))
            .catch(err=>{
                toast.error(`Error: ${err.message}`)
                setLoading(false)
            })
    }

    const googleLogin = () => {
        auth.signInWithPopup(googleAuthProvider)
            .then(({user})=>loginHandler(user))
            .catch(err=>{
                toast.error(`Error: ${err.message}`)
                setLoading(false)
            })
    }

    const loginForm = (
        <form>
            <div className='form-group'>
            <input 
                type="email" 
                className="form-control" 
                value={email}
                placeholder="Your Email"
                onChange={(e)=>setEmail(e.target.value)}
                autoFocus
            />
            </div>
            <div className='form-group'>
            <input 
                type="password" 
                className="form-control" 
                value={password}
                placeholder='Your password'
                onChange={(e)=>setPassword(e.target.value)}
            />
            </div>
            <Button 
                type='primary' 
                className='mb-3'
                block
                shape='round'
                icon={<MailOutlined />}
                onClick={handleSubmit}
                disabled={!(email && password && password.length>=6)}
            >Login</Button>
            <br />
            <Button 
                type='danger' 
                className='mb-3'
                block
                shape='round'
                icon={<GoogleOutlined />}
                onClick={googleLogin}
                size='large'
            >Login with Google</Button>
            <br />

            <Link to='/forgot/password' className="float-right text-danger">
                Forgot Password
            </Link>
        </form>
    )

    return (
        <div className="container p-5">
            <div className="row">
                <div className="div.col-md-6 offset-md-3">
                    {loading?<h4>Loading...</h4>:<h4>Login</h4>}
                    {loginForm}
                </div>
            </div>
        </div>
    )
}

export default Login;