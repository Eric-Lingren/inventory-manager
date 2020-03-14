import React from 'react';
import '../App.css'
import './feedback.css'
import { withFeedback } from '../context/FeedbackProvider'

const Feedback = ({ handleSubmitFeedback, handleFeedbackChange, feedbackInput } ) => {


    return (
        <div className='feedback-wrapper'>
            <h3> Submit Feedback </h3>
            <form className='submit-feedback-form' onSubmit={handleSubmitFeedback}>
                <label>
                    Suggestions or Improvements?
                </label>
                <textarea 
                    name='feedbackInput'
                    value={feedbackInput}
                    onChange={handleFeedbackChange}
                    cols='100'
                    rows='15'
                />
                <button className='default-button feedback-button'> Submit Feedback </button>
            </form>
        </div>
    );
}

export default withFeedback(Feedback)