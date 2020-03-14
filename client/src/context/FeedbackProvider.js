import React, { Component } from 'react'
import axios from 'axios'
import validator from 'validator'
import decode from 'jwt-decode';
import sanitizeData from '../HelperFunctions/SanitizeData'
const baseURL = '/feedback'

const FeedbackContext = React.createContext()

class FeedbackProvider extends Component {
    constructor(){
        super()
        this.state = {
            feedbackInput: ''
        }
    }

    //  State data handler for form input
    handleFeedbackChange = (e) => {
        const {name, value} = e.target
        this.setState({ [name]: sanitizeData(value) })
    }




    handleSubmitFeedback = (e) => {
        e.preventDefault()
        
        // axios.post('/auth/login', userInfo)
        // .then(res => {
        // .catch (err => {
        // })
    }


    render(){
        return (
            <FeedbackContext.Provider 
                value={{
                    ...this.state,
                    handleFeedbackChange: this.handleFeedbackChange,
                    handleSubmitFeedback: this.handleSubmitFeedback,
                    
                }}>
                { this.props.children }
            </FeedbackContext.Provider>
        )
    }
}

export default FeedbackProvider

export const withFeedback = C => props => (
    <FeedbackContext.Consumer>
        {value => <C {...props} {...value}/>}
    </FeedbackContext.Consumer>
)

