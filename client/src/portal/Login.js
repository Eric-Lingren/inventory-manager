import React from 'react';
import { withAuth } from '../context/AuthProvider'

const Login = ({ handleAuthChange, loginEmailInput, loginPasswordInput, authHandleLoginSubmit, loginRegisterErrorMessage }) => {

    return (
        <div>
            <h2> Login: </h2>
            <form onSubmit={authHandleLoginSubmit}>
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
            { loginRegisterErrorMessage && <p> { loginRegisterErrorMessage } </p>}
        </div>
    );
}

export default withAuth(Login)
