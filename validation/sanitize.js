const sanitizer = require('sanitizer')
const mysql2 = require('mysql2')

const sanitizeData = (data) => {
    let cleanedData;
    if(typeof(data) === 'object'){
        let objectKeys = Object.keys(data)
        let objectValues = Object.values(data)
        let cleanedValues = []

        objectValues.forEach(function(value, i) { 
            let cleanedForXSS= sanitizer.escape(value)
            cleanedValues.push(cleanedForXSS)
        })
        cleanedData = {}
        objectKeys.forEach((key, i) => cleanedData[key] = cleanedValues[i])
    } else {
        let cleanedForXSS =  sanitizer.escape(data)
        let cleanedForSqlInjection = mysql2.escape(cleanedForXSS)
        cleanedData = cleanedForSqlInjection.substr(1).slice(0, -1)
    }
    return cleanedData
}

module.exports = sanitizeData