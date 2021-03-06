import React, { useEffect } from 'react';
import './header.css'
import '../../App.css'
import { NavLink, Link } from 'react-router-dom';
import { withAuth } from '../../context/AuthProvider'


const Header = ({ getUserFromToken, user, logOut }) => {

    useEffect(() => {
        getUserFromToken()
    }, [getUserFromToken])


    return (
        <div className='header-wrapper'>
            { !user.name ?
                <div className='header-login-links-wrapper'>
                    <NavLink className='link' to='/login'> Login </NavLink>
                    <NavLink className='link' to='/register'> Register</NavLink>
                </div>
            :
                <div className='header-links-wrapper'>
                    <div className='header-left-container'>
                        <NavLink className='link' activeClassName="selected-link" to='/dashboard'> Dashboard </NavLink>
                        <NavLink className='link' activeClassName="selected-link" to='/manage-inventory'> Manage Inventory </NavLink>
                    </div>
                    <div className='header-right-container'>
                        <span className='user-name'> Welcome, {user.name}</span>
                        <button className='default-button logout-button' onClick={logOut}> Logout </button>
                        { user.isAdmin && <NavLink className='link' to='/admin-portal'> Admin Portal </NavLink> }
                    </div>
                </div>
            }
            <Link to='feedback'>
                <div className='alpha-header-container'>
                    <p className='alpha-text'> This product is in beta testing.  Please click here to submit feedback. </p>
                </div>
            </Link>
           
        </div>
    );
}

export default withAuth(Header)