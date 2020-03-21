const dotenv = require('dotenv')
dotenv.config();

module.exports = {
    logrocketId: process.env.REACT_APP_LOG_ROCKET_ID,
    nodeEnvironment: process.env.NODE_ENV,
    googleAnalyticsTag: process.env.REACT_APP_GOOGLE_ANALYTICS_TAG
}