var User = require('./model.js').User
var Profile = require('./model.js').Profile
const md5 = require('md5')
const fs = require('fs')

var sessionUser = {}
const cookieKey = 'sid'

const isLoggedIn = (req, res, next) => {
    var sid = req.cookies[cookieKey]

    if ( !sid ) return res.sendStatus(401)
    var loginUser = sessionUser[sid]

    if ( loginUser ) {
        req.loginUser = loginUser
        next()
    }
    else res.sendStatus(401)
}

const defaultUser = (req, res, next) => {
    var sid = req.cookies[cookieKey]

    if( !sid || !sessionUser[sid] ) {
        var sessionKey = md5('sessionKey' + new Date().getTime() + "mrj1")
        req.cookies[cookieKey] = sessionKey
        User.findOne({username: "mrj1"})
        .exec(function(err, doc){
            sessionUser[sessionKey] = doc
            next()
        })
    }
    else next()
}

exports.isLoggedIn = isLoggedIn
exports.defaultUser = defaultUser

const login = (req, res) => {
    var username = req.body.username
    var password = req.body.password
    if ( !username || !password ) return res.sendStatus(400)

    User.findOne({username: req.body.username})
    .exec(function(err, docs){
        var userObj = docs
        if ( userObj ) {
            var salt = userObj.salt;
            var saltedPassword = md5('password' + password + salt)
            if ( saltedPassword == userObj.saltedPassword ) {
                var sessionKey = md5('sessionKey' + new Date().getTime() + username)
                sessionUser[sessionKey] = userObj
                res.cookie(cookieKey, sessionKey, {maxAge: 7200*1000, httpOnly: true})
                var msg = {username: username, result: "success!"}
                res.send(msg)
                return
            }
        }
        res.sendStatus(401)
    })
}

const logout = (req, res) => {
    delete sessionUser[req.cookies[cookieKey]]
    console.log(sessionUser)
    res.clearCookie(cookieKey)
    res.send("OK")
}

const changePassword = (req, res) => {
    var msg = {
        username: sessionUser[req.cookies[cookieKey]].username,
        status: "will not change"
    }
    res.send(msg)
}

const register = (req, res) => {
    var salts = ""+new Date().getTime()+req.body.username
    User.findOne({username: req.body.username})
    .exec(function(err, doc) {
        if ( !doc ) {
            new User({
                username: req.body.username,
                salt: salts,
                saltedPassword: md5('password'+req.body.password+salts)
            }).save(function() {
                new Profile({
                    username: req.body.username,
                    displayName: req.body.displayName,
                    email: req.body.email,
                	birthDate: req.body.birthDate,
                    zipcode: req.body.zipcode,
                    phoneNum: req.body.phoneNum,
                	followers: [],
                	status: "Tell everyone how was it today!"
                }).save(function(){
                    msg = {
                        result: "success",
                        username: req.body.username
                    }
                    res.send(msg)
                    return
                });
            });
        }
        else {
            msg = {
                result: "The username has already exist"
            }
            res.status(400).send(msg)
        }
    })
}

module.exports.endPoints = (app) => {
    app.post('/login', login)
    app.post('/register', register)
    app.use(defaultUser)
    app.use(isLoggedIn)
    app.put('/logout', logout)
    app.put('/password', changePassword)
}

// new User({username: 'mrj1', salt: '12345', saltedPassword: md5('password'+'1-1-1'+'12345')})
// .save();
