const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    nodeEnvironment: process.env.NODE_ENV,
    port: process.env.PORT
}