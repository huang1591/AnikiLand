var User = require('./model.js').User
var Profile = require('./model.js').Profile
const md5 = require('md5')
const fs = require('fs')
const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
const session = require('express-session');

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
exports.isLoggedIn = isLoggedIn

const login = (req, res) => {
    var username = req.body.username
    var password = req.body.password
    if ( !username || !password ) return res.sendStatus(400)

    User.findOne({username: req.body.username, oauth: "rice"})
    .exec(function(err, docs){
        var userObj = docs
        if ( userObj ) {
            var salt = userObj.salt;
            var oauth = userObj.oauth;
            var saltedPassword = md5('password' + password + salt)
            if ( saltedPassword == userObj.saltedPassword ) {
                var sessionKey = md5(oauth + new Date().getTime() + username)
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
    console.log("SID:")
    console.log(req.cookies[cookieKey])
    console.log(sessionUser)
    console.log(req.loginUser)
    delete sessionUser[req.cookies[cookieKey]]
    console.log("Session:")
    console.log(sessionUser)
    res.clearCookie(cookieKey)
    res.send("OK")
}

const changePassword = (req, res) => {
    User.findOne({username: req.loginUser.username, oauth: "rice"}).exec(function(err, doc) {
        User.updateOne({username: doc.username}, {saltedPassword: md5('password'+req.body.password+doc.salts)})
        .exec(function(err, _) {
            res.sendStatus(200)
        })
    })
}

const register = (req, res) => {
    var salts = ""+new Date().getTime()+req.body.username
    User.findOne({username: req.body.username, oauth: "rice"})
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
                	status: "Tell everyone how was it today!",
                    avatar: "http://res.cloudinary.com/zh20cloud/image/upload/v1511881666/sample.jpg",
                    oauth: "rice"
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

const oauthLogin = (req, res) => {
    var username = req.body.username;
    var oauth = "google"
    User.findOne({username: username, oauth: oauth}).exec(function(err, doc) {
        console.log(req.cookies)
        if ( !doc ) {
            new User({username: username, oauth: oauth}).save()
            new Profile({
                username: username,
                displayName: "please complete your profile",
                email: "please complete your profile",
                birthDate: "please complete your profile",
                zipcode: "please complete your profile",
                phoneNum: "please complete your profile",
                followers: [],
                status: "Tell everyone how was it today!",
                avatar: "http://res.cloudinary.com/zh20cloud/image/upload/v1511881666/sample.jpg",
                oauth: oauth
            }).save()
        }
    })
    var sessionKey = md5(oauth + new Date().getTime() + username)
    sessionUser[sessionKey] = {username: username, oauth: oauth}

    res.cookie(cookieKey, sessionKey, {maxAge: 7200*1000, httpOnly: true})
    var msg = {username: username, result: "success!"}
    res.send(msg)
}

const checkOauth = (req, res) => {
    res.send({oauth: req.loginUser.oauth})
}


module.exports.endPoints = (app) => {


    app.post('/login', login)
    app.post('/register', register)
    app.post('/oauthLogin', oauthLogin)

    app.use(isLoggedIn)
    app.put('/logout', logout)
    app.put('/password', changePassword)
    app.get('/checkOauth', checkOauth)
}

// new User({username: 'zh20'})
// .save();
