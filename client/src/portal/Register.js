import React from 'react';
import { withAuth } from '../context/AuthProvider'

const Register = ({ handleAuthChange, registerNameInput, registerEmailInput, registerPasswordInput, registerPasswordConfirmInput }) => {
    return (
        <div>
            <h2> Register: </h2>
            <form>
            <label> Name </label>
                <input
                    type='text'
                    name='registerNameInput'
                    value={registerNameInput}
                    onChange={handleAuthChange}
                />
                <label> Email </label>
                <input
                    type='email'
                    name='registerEmailInput'
                    value={registerEmailInput}
                    onChange={handleAuthChange}
                />

                <label> Password </label>
                <input
                    type='password'
                    name='registerPasswordInput'
                    value={registerPasswordInput}
                    onChange={handleAuthChange}
                />
                <label> Confirm Password </label>
                <input
                    type='password'
                    name='registerPasswordConfirmInput'
                    value={registerPasswordConfirmInput}
                    onChange={handleAuthChange}
                />
                <button> Register </button>
            </form>
        </div>
    );
}

export default withAuth(Register)
