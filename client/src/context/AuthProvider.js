import React, { Component } from 'react'
import axios from 'axios'
import validator from 'validator'
import decode from 'jwt-decode';
import sanitizeData from '../HelperFunctions/SanitizeData'

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
            registerFirstNameInput: '',
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
        let token = localStorage.getItem("iodToken")
        if(token) {
            let decodedJwt = decode(token)
            this.setState({ user: decodedJwt.user })
            return decodedJwt;
        }
    }

    // Authenticates and logs in a user
    authHandleLoginSubmit = (history) => {
        let userInfo = {
            email: this.state.loginEmailInput,
            password: this.state.loginPasswordInput
        }
        
        axios.post('/auth/login', userInfo).then(res => {
            console.log(res.data);
            if(res.status === 201){
                //  Successful login
                const { user, iodToken } = res.data
                localStorage.setItem("inventoryManagement", iodToken)
                this.setState({
                    loginAttemptFailed: false, 
                    token: iodToken,
                    user: user,
                    loginPasswordInput: '',
                    accountHasNotBeenActivated: false
                }
                // , () => history.push('/dashboard')
                )
            } else {
                // Bad email/password combination
                return this.setState({loginAttemptFailed: true, accountHasNotBeenActivated: false, loginRegisterErrorMessage: 'Email or password are incorrect'})
            }
        })
        .catch (err => {
            // Server error, or their account has been suspended
            return this.setState({loginAttemptFailed: true, accountHasNotBeenActivated: false, loginRegisterErrorMessage: err.response.data.msg})
        })
    }


    //  Submits a new user to our Users database table
    handleUserRegistration = (locationObject) => {
        let password = this.state.registerPasswordInput
        let passwordConfirm = this.state.registerPasswordConfirmInput
        let referringUrlBasePath = locationObject.pathname
        let referringUrlQuery = locationObject.search
        this.setState({
            displayLoadingIcon: true
        })

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

        //  Need to identify which community user gets auto-enable access rights to
        let usersCommunity;
        if(referringUrlBasePath.includes('coaching')){
            usersCommunity = 'coaching'
        }
        if(referringUrlBasePath.includes('breakthroughs')){
            usersCommunity = 'breakthroughs'
        }

        //  If there is a company Id in the registration URL, get the Id to attach it to the user
        let companyId;
        if(referringUrlQuery && referringUrlQuery.includes('company')){
            let companyIdStartIndex = referringUrlQuery.lastIndexOf('company=')+8
            let slicedCompanyIdString = referringUrlQuery.slice(companyIdStartIndex)
            companyId = slicedCompanyIdString
        }

        //  If there is a company Id in the registration URL, get the Id to attach it to the user
        let isCoachingClientAdmin;
        if(referringUrlQuery && referringUrlQuery.includes('coachingClientAdmin')){
            isCoachingClientAdmin = true
        }
        
        //  If all data is good, create the new user object in the DB
        if(doPasswordsMatch && isPasswordLength ){
            const newUser = {
                email: this.state.registerEmailInput,
                password: this.state.registerPasswordInput,
                firstName: this.state.registerFirstNameInput,
                lastName: this.state.registerLastNameInput,
                community: usersCommunity 
            }
            
            //  If there was a company ID, append it to the new user object
            if(companyId){ newUser['companyId'] = companyId }
            if(isCoachingClientAdmin){ newUser['isCoachingClientAdmin'] = isCoachingClientAdmin }

            axios.post('/v1/auth/register', newUser).then(res => {
                if(res.status === 201){
                    this.setState({
                        loginAttemptFailed: false, 
                        isRegistered: true,
                        registerPasswordInput: '',
                        registerPasswordConfirmInput: '',
                        displayLoadingIcon: false
                    })
                } else {
                    return this.setState({loginAttemptFailed: true, loginRegisterErrorMessage: 'This email address is already registered. Click the link below to login.', displayLoadingIcon: false})
                }
            })
            .catch (err => {
                return this.setState({loginAttemptFailed: true, loginRegisterErrorMessage: 'Something broke. Please try again', displayLoadingIcon: false})
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

