import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './global/Home'
import Header from './global//header/Header'
import Login from './portal/Login'
import Register from './portal/Register'
import AdminPortalHome from './manageInventory/admin/AdminPortalHome'
import ProtectedRoute from './shared/ProtectedRoute'
import Dashboard from './Dashboard'
import Feedback from './feedback/Feedback'
import ManageInventoryHome from './manageInventory/ManageInventoryHome'
// import CreateInventoryItem from './manageInventory/admin/items/CreateInventoryItem'
import { withAuth } from './context/AuthProvider'
import LogRocket from 'logrocket';

const setLogrocketIdentifiers = (user) => {
  LogRocket.identify(user.id, {
    name: user.name,
    email: user.email,
    id: user.id
  })
}


const App = ({ user }) => {

  { user.id && setLogrocketIdentifiers(user) }

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/feedback' component={Feedback} />
        <ProtectedRoute path='/dashboard' component={Dashboard} redirectTo={"/login"} />
        <ProtectedRoute path='/manage-inventory' component={ManageInventoryHome} redirectTo={"/login"} />
        {/* <ProtectedRoute path='/create-item' component={CreateInventoryItem} redirectTo={"/login"} /> */}
        <ProtectedRoute path='/admin-portal' component={AdminPortalHome} redirectTo={"/manage-inventory"} />
      </Switch>
    </div>
  )
}

export default withAuth(App)
