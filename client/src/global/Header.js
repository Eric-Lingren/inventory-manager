import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../context/AuthProvider'


const Header = ({ getUserFromToken, user, logOut }) => {

    useEffect(() => {
        getUserFromToken()
    }, [getUserFromToken])


    return (
        <div >
            { !user.name ?
                <>
                    <Link to='/login'> Login </Link>
                    <Link to='/register'> Register</Link>
                </>
                :
                <>
                    <Link to='/dashboard'> Dashboard </Link>
                    {/* <Link to='/add-inventory'> Add Inventory </Link> */}
                    <Link to='/manage-inventory'> Manage My Inventory </Link>
                    <span> Welcome {user.name}</span>
                    <button onClick={logOut}> Logout </button>
                    { user.isAdmin && <Link to='/admin-portal'> Admin Portal </Link> }
                </>
            }
            
            
        </div>
    );
}

export default withAuth(Header)