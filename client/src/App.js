import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'

import './App.css';

const App = () => {
  return (
    <div>
    <div>Index</div>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/" component={Home} />
    </Switch>
    </div>
  );
}

export default App;
