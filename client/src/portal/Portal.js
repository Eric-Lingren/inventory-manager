import React from 'react';
import { withAuth } from '../context/AuthProvider'
import Login from './Login'
import Register from './Register'

const Portal = ({ isShowingRegister, togglePortalForms }) => {
  return (
    <div>
    {
      !isShowingRegister ? <Login /> : <Register />
    }
    <p onClick={togglePortalForms}> 
      {!isShowingRegister ?
        'No Account? Click here to register.'
      :
        'Have an account?  Click here to login.'
      }
      
    </p>
    </div>
  );
}

export default withAuth(Portal);
