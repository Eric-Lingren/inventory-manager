import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './global/Home'
import Header from './global/Header'
import Login from './portal/Login'
import Register from './portal/Register'
import AdminPortalHome from './portal/adminPortal/AdminPortalHome'
import ProtectedRoute from './shared/ProtectedRoute'
import Dashboard from './Dashboard'
import AddInventoryHome from './addInventory/AddInventoryHome'
import ViewInventoryHome from './viewInventory/ViewInventoryHome'

const App = () => {

  return (
    <div className="App">
<Header />
      <Switch>
        
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <ProtectedRoute path='/dashboard' component={Dashboard} redirectTo={"/login"} />
        <ProtectedRoute path='/add-inventory' component={AddInventoryHome} redirectTo={"/login"} />
        <ProtectedRoute path='/view-inventory' component={ViewInventoryHome} redirectTo={"/login"} />
        <ProtectedRoute path='/admin-portal' component={AdminPortalHome} redirectTo={"/"} />
      </Switch>

    </div>
  );
}

export default App;
