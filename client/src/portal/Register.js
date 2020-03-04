import React from 'react';
import { withAuth } from '../context/AuthProvider'

const Register = ({ handleAuthChange, registerNameInput, registerEmailInput, registerPasswordInput, registerPasswordConfirmInput, handleUserRegistration, loginRegisterErrorMessage }) => {
    return (
        <div>
            <h2> Register: </h2>
            <form onSubmit={handleUserRegistration}>
            <label> Name </label>
                <input
                    type='text'
                    name='registerNameInput'
                    required={true}
                    value={registerNameInput}
                    onChange={handleAuthChange}
                />
                <label> Email </label>
                <input
                    type='email'
                    name='registerEmailInput'
                    required={true}
                    value={registerEmailInput}
                    onChange={handleAuthChange}
                />

                <label> Password </label>
                <input
                    type='password'
                    name='registerPasswordInput'
                    required={true}
                    value={registerPasswordInput}
                    onChange={handleAuthChange}
                />
                <label> Confirm Password </label>
                <input
                    type='password'
                    name='registerPasswordConfirmInput'
                    required={true}
                    value={registerPasswordConfirmInput}
                    onChange={handleAuthChange}
                />
                <button> Register </button>
            </form>
            { loginRegisterErrorMessage && <p> {loginRegisterErrorMessage} </p> }
        </div>
    );
}

export default withAuth(Register)
