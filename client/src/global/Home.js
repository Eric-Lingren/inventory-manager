import React from 'react';
import unorganizedImage from '../assets/unorganized-image.jpg'
import organizedImage from '../assets/organized-image.jpg'

const Dashboard = () => {
    return (
        <div className='home-wrapper'>
            <div className='image-container'>
                <img src={unorganizedImage} alt='unorganized'  className='home-image'/>
                <div className="centered-image-text">Turn This...</div>
            </div>
            <div className='image-container'>
                <img src={organizedImage} alt='organized'  className='home-image'/>
                <div className="centered-image-text"> Into This! </div>
            </div>
            
        </div>
    );
}

export default Dashboard
