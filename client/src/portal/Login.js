import React from 'react';
import '../App.css'
import './portal.css'
import { withAuth } from '../context/AuthProvider'

const Login = ({ history, handleAuthChange, loginEmailInput, loginPasswordInput, authHandleLoginSubmit, loginRegisterErrorMessage }) => {

    const submitLogin = (e) => {
        e.preventDefault()
        authHandleLoginSubmit(history)
    }

    return (
        <div className='poral-wrap'>
            <h2> LOGIN </h2>
            
            <form onSubmit={submitLogin} className='form-wrap'>
                <div className='portal-input-wrap'>
                    <label className='portal-input-label'> Email </label>
                    <input
                        type='email'
                        className='text-input'
                        name='loginEmailInput'
                        value={loginEmailInput}
                        onChange={handleAuthChange}
                        required={true}
                    />
                </div>
                <div className='portal-input-wrap'>
                    <label className='portal-input-label'> Password </label>
                    <input
                        className='text-input'
                        type='password'
                        name='loginPasswordInput'
                        value={loginPasswordInput}
                        onChange={handleAuthChange}
                        required={true}
                    />
                </div>
                <button className='default-button portal-button'> Login </button>
                
            </form>
            { loginRegisterErrorMessage && <p> { loginRegisterErrorMessage } </p> }
        </div>
    );
}

export default withAuth(Login)
