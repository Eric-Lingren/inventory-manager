import ReactGA from 'react-ga';
import { googleAnalyticsTag } from '../config/Config'

export const initGoogleAnalytics = () => {           
    ReactGA.initialize(googleAnalyticsTag) 
}

export const pageView = () => {  
    ReactGA.pageview(window.location.pathname +window.location.search)
}

export const eventTracker = (category, action, label) => {
    ReactGA.event({
        category: category,
        action: action,
        label: label
    })
}