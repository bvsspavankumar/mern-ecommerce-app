import React, {useEffect} from 'react'
import { Switch, Route } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import {useDispatch} from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'

import Login from './pages/auth/Login'
import Logout from './pages/auth/Logout'
import Register from './pages/auth/Register'
import RegisterComplete from './pages/auth/RegisterComplete'
import Home from './pages/Home'
import Header from './components/nav/Header'

import {auth} from './firebase'

import './App.css';

const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(async user=>{
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            // name: user.name,
            email: user.email,
            token: idTokenResult.token
          }
        })
      }
    })
    return () => unsubscribe()
  }, [])
  return (
    <>
    <Header />
    <ToastContainer />
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/register/complete" component={RegisterComplete} />
      <Route path="/register" component={Register} />
      <Route path="/" component={Home} />
    </Switch>
    </>
  );
}

export default App;
