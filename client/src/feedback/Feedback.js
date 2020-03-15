import React, { useEffect } from 'react';
import '../App.css'
import './feedback.css'
import { withFeedback } from '../context/FeedbackProvider'

const Feedback = ({ handleSubmitFeedback, handleFeedbackChange, feedbackInput, isShowingFeedbackStatus, feedbackMessage, clearFeedbackState } ) => {

    useEffect(() => {
        return () => clearFeedbackState()
    }, [ clearFeedbackState ])

    return (
        <div className='feedback-wrapper'>
            <h3> Suggestions or Improvements? </h3>
            <form className='submit-feedback-form' onSubmit={handleSubmitFeedback}>
                <textarea 
                    name='feedbackInput'
                    value={feedbackInput}
                    onChange={handleFeedbackChange}
                    required={true}
                    placeholder='2000 Character Limit...'
                    cols='100'
                    rows='15'
                    maxLength='2000'
                />
                <button className='default-button feedback-button'> Submit Feedback </button>
            </form>
            { isShowingFeedbackStatus === true && <p> {feedbackMessage} </p> }
        </div>
    );
}

export default withFeedback(Feedback)