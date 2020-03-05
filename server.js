const express = require("express")
const app = express()
const expressJwt = require("express-jwt")
const path = require("path")
const bodyParser = require("body-parser")
const keys = require("./config/keys")
const cors = require("cors")
const morgan = require('morgan')
const { port, nodeEnvironment } = require('./config/config')
const PORT = port
const { SESSION_SECRET } = process.env;


//  .ENV SETUP
    // Enables use of .env varibles in the server
require("dotenv").config();

//  *** BODY DATA ***
    // Global body parser middleware - converts strings to json and vice versa
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(bodyParser.text());


//  CORS
    //  Global cors middleware - sets orgins & responses
app.use(cors({
        origin:
        process.env.NODE_ENV === "production"
            ? process.env.CLIENT_URL
            : "http://localhost:3000",
        credentials: true
    }
))

//  FOR DEVELOPMENT USES
    //  Morgan middleware - Enables better development testing for api calls
if(nodeEnvironment === 'development') app.use(morgan('dev'))


// API HEADERS
    // Middleware that sends and accepts specific API headers
app.use( (req, res, next, err) => { 
    res.header("Access-Control-Allow-Origin", "*") 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept") 
    next()
})


//  ERRORS
    //  Global error handling middleware
app.use( (err, req, res, next) => {
        if (err.name === "UnauthorizedError") {
            res.status(err.status);
        }
        return res.send({ message: err.message })
    }
)


//  SERVING STATIC FILES
    //  App Middleware to serve static files from client folders
app.use(express.static(path.join(__dirname, "client", "build")))


// DATABASES
    // MySQL database models aggregator
const db = require("./models");


// ROUTES
    //  Below are open routes anyone can access 
    //  These may have nested jwt authentication within the routes to access specific data, but most do not
app.use('/auth', require("./routes/auth.js"))
    //  Protected Routes
app.use("/api", expressJwt({secret: keys.secretOrKey}))
app.use('/api/admin', require("./routes/api/admin"))
app.use('/api/inventory', require("./routes/api/inventory"))

//  SENDING BUILD FILE
    //  Server sends a compiled build file to users on web browsers
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

    
// RUNNING SERVER
    //  Server initializes, runs, and listens
db.sequelize.sync().then(() => {
    console.log(`[0] Connected to the database: ${db.sequelize.config.database}`)
    require('http').createServer(app).listen(PORT, () => {
        console.log(`[+] Express is listening on port: ${PORT}`)
    })
})
