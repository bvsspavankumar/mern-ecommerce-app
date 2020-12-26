import React, {useState} from 'react'
import {auth, googleAuthProvider} from '../../firebase'
import {toast} from 'react-toastify'
import {Button} from 'antd'
import {GoogleOutlined, MailOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux'

const Login = ({history}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const loginHandler = (user) => {
        toast.success(`Login successful`)
        dispatch({
            type: "LOGGED_IN_USER",
            payload: {
                email: user.email,
                token: user.getIdTokenResult().token
            }
        })
        history.push('/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        auth.signInWithEmailAndPassword(email, password)
            .then(({user})=>loginHandler(user))
            .catch(err=>{
                toast.error(`Error: ${err.message}`)
                setLoading(false)
            })
        
        // setEmail("")
        // setPassword("")
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
        <form onSubmit={handleSubmit}>
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