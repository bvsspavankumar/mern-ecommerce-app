import React, {useState} from 'react'
import {toast} from 'react-toastify'

import {auth} from '../../firebase'
import UserNav from '../../components/nav/UserNav'

const Password = ({history}) => {
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        await auth.currentUser.updatePassword(password)
            .then(()=>{
                setLoading(false)
                toast.success('Password updated')
                history.push("/user/history")
            })
            .catch(err=>{
                setLoading(false)
                toast.success(`Error: ${err.message}`)
            })
        setPassword("")
    }

    const passwordUpdateForm = (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Your Password</label>
                <input
                    className="form-control"
                    type="password"
                    onChange={e=>setPassword(e.target.value)}
                    placeholder="New password"
                    disabled={loading}
                />
                <button 
                    className="btn btn-primary"
                    disabled={!password || password.length<6 || loading}
                >Submit</button>
            </div>
        </form>
    )

    return (
        <div className="container-fluid">
            <div className="col md-2">
                <UserNav />
            </div>
            <div className="col">
            {loading?<h3>Loading...</h3>:Password}
            {passwordUpdateForm}
            </div>
        </div>
    )
}

export default Password