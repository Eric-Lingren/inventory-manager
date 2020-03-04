import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home'
import Header from './Header'
import Login from './portal/Login'
import Register from './portal/Register'
import ProtectedRoute from './shared/ProtectedRoute'
import Dashboard from './Dashboard'

const App = () => {

  return (
    <div className="App">
<Header />
      <Switch>
        
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <ProtectedRoute path='/dashboard' component={Dashboard} redirectTo={"/login"} />
      </Switch>

    </div>
  );
}

export default App;
