import React, { Component } from 'react'
import axios from 'axios'
import validator from 'validator'
import decode from 'jwt-decode';
import sanitizeData from '../HelperFunctions/SanitizeData'
const baseURL = '/auth'

const AuthContext = React.createContext()

class AuthProvider extends Component {
    constructor(){
        super()
        this.state = {
            isShowingRegister : false,
            loginEmailInput: '',
            loginPasswordInput: '',
            registerNameInput: '',
            registerEmailInput : '',
            registerPasswordInput: '',
            registerPasswordConfirmInput: '',
            token: localStorage.getItem("inventoryManagement") || '',
            user: {},
            loginAttemptFailed: false,
            loginRegisterErrorMessage : '',
        }
    }

    //  State data handler for form input
    handleAuthChange = (e) => {
        const {name, value} = e.target
        this.setState({ [name]: sanitizeData(value) })
    }

    togglePortalForms = () => {
        this.setState({ isShowingRegister: !this.state.isShowingRegister })
    }

    getUserFromToken = () => {
        let token = localStorage.getItem("inventoryManagement")
        if(token) {
            let decodedJwt = decode(token)
            this.setState({ user: decodedJwt.user })
            return decodedJwt;
        }
    }

    // Authenticates and logs in a user
    authHandleLoginSubmit = (e) => {
        e.preventDefault()
        let userInfo = {
            email: this.state.loginEmailInput,
            password: this.state.loginPasswordInput
        }
        
        axios.post('/auth/login', userInfo).then(res => {
            console.log(res.data);
            if(res.status === 201){
                //  Successful login
                const { user, inventoryToken } = res.data
                localStorage.setItem("inventoryManagement", inventoryToken)
                this.setState({
                    loginAttemptFailed: false, 
                    token: inventoryToken,
                    user: user,
                    loginPasswordInput: '',
                    accountHasNotBeenActivated: false,
                    loginRegisterErrorMessage: ''
                }
                // , () => history.push('/dashboard')
                )
            } else {
                // Bad email/password combination
                return this.setState({loginAttemptFailed: true, loginRegisterErrorMessage: 'Email or password are incorrect'})
            }
        })
        .catch (err => {
            console.log(err.response.data.msg);
            // Server error, or their account has been suspended
            return this.setState({loginAttemptFailed: true, loginRegisterErrorMessage: err.response.data.msg})
        })
    }


    //  Submits a new user to our Users database table
    handleUserRegistration = (e) => {
        e.preventDefault()
        let password = this.state.registerPasswordInput
        let passwordConfirm = this.state.registerPasswordConfirmInput

        //  Need to confirm password is long enough
        let isPasswordLength = validator.isLength(password, { min: 6, max: 30 })
        if(!isPasswordLength){
            this.setState({loginRegisterErrorMessage: 'Password must be 6 - 30 characters'})
        }

        //  Need to confirm both password fields match
        let doPasswordsMatch = validator.equals(password, passwordConfirm)
        if(!doPasswordsMatch){
            this.setState({loginRegisterErrorMessage: 'Passwords do not match'})
        }   
        
        //  If all data is good, create the new user object in the DB
        if(doPasswordsMatch && isPasswordLength ){
            const newUser = {
                email: this.state.registerEmailInput,
                password: this.state.registerPasswordInput,
                name: this.state.registerNameInput
            }

            axios.post(`${baseURL}/register`, newUser).then(res => {
                if(res.status === 201){
                    this.setState({
                        loginAttemptFailed: false, 
                        isRegistered: true,
                        registerPasswordInput: '',
                        registerPasswordConfirmInput: '',
                        loginRegisterErrorMessage: 'Success.  Please Login In'
                    })
                } else {
                    return this.setState({loginAttemptFailed: true, loginRegisterErrorMessage: 'This email address is already registered. Click the link below to login.'})
                }
            })
            .catch (err => {
                return this.setState({loginAttemptFailed: true, loginRegisterErrorMessage: 'Something broke. Please try again'})
            })
        }
    }





    clearErrorMessages = () => {
        this.setState({ loginRegisterErrorMessage: '', loginAttemptFailed: false, accountHasNotBeenActivated: false })
    }

    logOut = () => {
        localStorage.removeItem("inventoryManagement");
        this.setState({ user: {}, token: "" })
    }


    render(){
        return (
            <AuthContext.Provider 
                value={{
                    ...this.state,
                    handleAuthChange: this.handleAuthChange,
                    togglePortalForms: this.togglePortalForms,
                    authHandleLoginSubmit: this.authHandleLoginSubmit,
                    handleUserRegistration: this.handleUserRegistration,
                    clearErrorMessages: this.clearErrorMessages,
                    logOut: this.logOut,
                    getUserFromToken: this.getUserFromToken,
                    
                }}>
                { this.props.children }
            </AuthContext.Provider>
        )
    }
}

export default AuthProvider

export const withAuth = C => props => (
    <AuthContext.Consumer>
        {value => <C {...props} {...value}/>}
    </AuthContext.Consumer>
)

