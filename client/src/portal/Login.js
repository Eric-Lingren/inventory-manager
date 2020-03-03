import React from 'react';
import { withAuth } from '../context/AuthProvider'

const Login = ({ handleAuthChange, loginEmailInput, loginPasswordInput }) => {

    return (
        <div>
            <h2> Login: </h2>
            <form>
                <label> Email </label>
                <input
                    type='email'
                    name='loginEmailInput'
                    value={loginEmailInput}
                    onChange={handleAuthChange}
                />

                <label> Password </label>
                <input
                    type='password'
                    name='loginPasswordInput'
                    value={loginPasswordInput}
                    onChange={handleAuthChange}
                />
                <button> Login </button>
            </form>
        </div>
    );
}

export default withAuth(Login)
