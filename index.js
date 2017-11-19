
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const isLoggedIn = require('./src/auth.js').isLoggedIn
const defaultUser = require('./src/auth.js').defaultUser

const app = express()

app.use(logger('default'))
app.use(bodyParser.json())
app.use(cookieParser())


//require('./src/dbpost.js')(app)
require('./src/auth.js').endPoints(app)
require('./src/articles.js')(app)
require('./src/profile.js')(app)
require('./src/hello.js')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
