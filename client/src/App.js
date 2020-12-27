import React, {useEffect} from 'react'
import { Switch, Route } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import {useDispatch} from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'

import Login from './pages/auth/Login'
import Logout from './pages/auth/Logout'
import ForgotPassword from './pages/auth/ForgotPassword'
import Register from './pages/auth/Register'
import RegisterComplete from './pages/auth/RegisterComplete'
import Home from './pages/Home'
import History from './pages/user/History'
import Password from './pages/user/Password'
import Wishlist from './pages/user/Wishlist'
import AdminDashboard from './pages/admin/AdminDashboard'
import CategoryCreate from './pages/admin/category/CategoryCreate'
import Header from './components/nav/Header'
import UserRoute from './components/routes/UserRoute'
import AdminRoute from './components/routes/AdminRoute'
import {currentUser} from './functions/auth'

import {auth} from './firebase'

import './App.css';

const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(async user=>{
      if (user) {
        const token = await user.getIdTokenResult()
        currentUser(token.token)
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
      }
    })
    return () => unsubscribe()
  }, [dispatch])
  return (
    <>
    <Header />
    <ToastContainer />
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/forgot/password" component={ForgotPassword} />
      <Route path="/register/complete" component={RegisterComplete} />
      <Route path="/register" component={Register} />
      <UserRoute path="/user/history" component={History} />
      <UserRoute path="/user/password" component={Password} />
      <UserRoute path="/user/wishlist" component={Wishlist} />
      <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
      <AdminRoute path="/admin/category" component={CategoryCreate} />
      <Route path="/" component={Home} />
    </Switch>
    </>
  );
}

export default App;
