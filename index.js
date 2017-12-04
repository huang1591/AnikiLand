
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const isLoggedIn = require('./src/auth.js').isLoggedIn


const app = express()


const enableCORS = (req, res, next) => {
    res.header('Access-Control-Allow-Origin',req.headers.origin)
    res.header('Access-Control-Allow-Credentials',true)
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers','Authorization, Content-Type')
    if(req.method === 'OPTIONS') {
    	res.status(200).send("OK")
    } else {
    	next()
    }
}

app.use(logger('default'))
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(cookieParser())

app.use(enableCORS)
//require('./src/dbpost.js')(app)
require('./src/auth.js').endPoints(app)
require('./src/articles.js')(app)
require('./src/profile.js')(app)
require('./src/following.js')(app)

//require('./src/hello.js')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
