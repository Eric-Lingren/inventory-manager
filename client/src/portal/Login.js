import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../context/AuthProvider'

const Login = ({ history, handleAuthChange, loginEmailInput, loginPasswordInput, authHandleLoginSubmit, loginRegisterErrorMessage }) => {

    const submitLogin = (e) => {
        e.preventDefault()
        authHandleLoginSubmit(history)
    }

    return (
        <div>
            <h2> Login: </h2>
            <form onSubmit={submitLogin}>
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
            { loginRegisterErrorMessage && <p> { loginRegisterErrorMessage } </p> }
            <Link to='/register'> No Account?  Register Here </Link>
        </div>
    );
}

export default withAuth(Login)
