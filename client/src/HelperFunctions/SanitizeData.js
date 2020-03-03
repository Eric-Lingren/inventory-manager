const DOMPurify = require('dompurify');

const sanitizeData = (dirtyData) => {
    let cleanData = DOMPurify.sanitize(dirtyData)
    cleanData = cleanData.replace(/&amp;/g,'&')
    return cleanData
}

module.exports = sanitizeData