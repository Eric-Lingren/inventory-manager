import React from 'react';
import { withAuth } from '../context/AuthProvider'

const Register = ({ handleAuthChange, registerNameInput, registerEmailInput, registerPasswordInput, registerPasswordConfirmInput, handleUserRegistration, loginRegisterErrorMessage }) => {
    return (
        <div className='poral-wrap'>
            <h2> Register: </h2>
            <form onSubmit={handleUserRegistration} className='form-wrap'>
            <div className='portal-input-wrap'>
                <label className='portal-input-label'> Name </label>
                <input
                    type='text'
                    className='text-input'
                    name='registerNameInput'
                    required={true}
                    value={registerNameInput}
                    onChange={handleAuthChange}
                />
            </div>
            <div className='portal-input-wrap'>
                <label className='portal-input-label'> Email </label>
                <input
                    type='email'
                    className='text-input'
                    name='registerEmailInput'
                    required={true}
                    value={registerEmailInput}
                    onChange={handleAuthChange}
                />
            </div>
            <div className='portal-input-wrap'>
                <label className='portal-input-label'> Password </label>
                <input
                    type='password'
                    className='text-input'
                    name='registerPasswordInput'
                    required={true}
                    value={registerPasswordInput}
                    onChange={handleAuthChange}
                />
            </div>
            <div className='portal-input-wrap'>
                <label className='portal-input-label'> Confirm Password </label>
                <input
                    type='password'
                    className='text-input'
                    name='registerPasswordConfirmInput'
                    required={true}
                    value={registerPasswordConfirmInput}
                    onChange={handleAuthChange}
                />
            </div>
                <button className='default-button portal-button'> Register </button>
            </form>
            { loginRegisterErrorMessage && <p> {loginRegisterErrorMessage} </p> }
        </div>
    );
}

export default withAuth(Register)
