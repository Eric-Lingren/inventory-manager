import React, { Component } from 'react'
import { withAuth } from '../context/AuthProvider'
import { Route, Redirect } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'
import decode from 'jwt-decode';


class ProtectedRoute extends Component {

    render() {
        const { token, path, otherProps, redirectTo } = this.props
        const Component = this.props.component
        let isTokenExpired = false;
        let decodedJwt = null;
        // let canAccessComponent = false


        // const checkAccessRights = (user) => {
        //     if(user && path === '/admin-portal'){
        //         canAccessComponent = true
        //     }
        // }


        if(this.props.token) {
            decodedJwt = decode(this.props.token)
            if(decodedJwt.exp < Date.now() / 1000) {
                this.props.logOut();
                isTokenExpired = true;
            } 
            // else {
            //     checkAccessRights(decodedJwt.user)
            // }
        }
        else {
            decodedJwt = null;
        }


        return (
            token && !isTokenExpired ?
            (
                <Route
                    path={path}
                    render={props => (
                        <ErrorBoundary >
                            <Component {...props} {...otherProps} currentUser={decodedJwt.user} />
                        </ErrorBoundary>
                    )}
                />
            ) : (
                <Redirect to={redirectTo} />
            )
        )
    }
}

export default withAuth(ProtectedRoute)