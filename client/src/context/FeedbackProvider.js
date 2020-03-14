import React, { Component } from 'react'
import axios from 'axios'
import sanitizeData from '../HelperFunctions/SanitizeData'
const baseURL = '/feedback'

const FeedbackContext = React.createContext()

class FeedbackProvider extends Component {
    constructor(){
        super()
        this.state = {
            feedbackInput: '',
            feedbackMessage: '',
            isShowingFeedbackStatus: null
        }
    }


    handleFeedbackChange = (e) => {
        const {name, value} = e.target
        this.setState({ [name]: sanitizeData(value) })
    }


    handleSubmitFeedback = (e) => {
        e.preventDefault()
        const feedback = { feedback: this.state.feedbackInput}
        axios.post(`${baseURL}`, feedback)
        .then(res => {
            this.setState({ feedbackInput: '', feedbackMessage: 'Thanks for your feedback!  It is appreciated!',
            isShowingFeedbackStatus: true })
        })
        .catch (err => {
            this.setState({ feedbackMessage: 'Something broke with submitting your feedback.  Please try again.',
            isShowingFeedbackStatus: true })
        })
    }

    clearFeedbackState = () => {
        this.setState({ feedbackMessage: '', isShowingFeedbackStatus: null, feedbackInput: '' })
    }

    
    render(){
        return (
            <FeedbackContext.Provider 
                value={{
                    ...this.state,
                    handleFeedbackChange: this.handleFeedbackChange,
                    handleSubmitFeedback: this.handleSubmitFeedback,
                    clearFeedbackState: this.clearFeedbackState
                    
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

