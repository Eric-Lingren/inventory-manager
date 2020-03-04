import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from './context/AuthProvider'


const Header = ({ getUserFromToken, user, logOut }) => {
    console.log(user);
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
                    <span> Welcome {user.name}</span>
                    <button onClick={logOut}> Logout </button>
                </>
            }
            
            
        </div>
    );
}

export default withAuth(Header)