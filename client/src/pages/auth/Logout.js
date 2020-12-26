import React from 'react'

import firebase from 'firebase'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {toast} from 'react-toastify'

import {auth} from '../../firebase'

const Logout = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const logout = () => {
        history.push('/')
        if (auth.currentUser == null) {
            toast.error('Not Logged in')
            return
        }
        console.log(`cur:${firebase.auth().currentUser}`)
        auth.signOut()
        dispatch({
            type: "LOGOUT",
            payload: null
        })
        toast.success('Successfully logged out')
    }

    return <>{logout()}</>
}

export default Logout