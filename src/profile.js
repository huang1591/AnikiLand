var User = require('./model.js').User
var Profile = require('./model.js').Profile
var Article = require('./model.js').Article

const headline = (req, res) => {
    Profile.update({username: req.loginUser.username}, {status: req.body.headline})
    .exec(function(err, doc){
        var msg = {
            username: req.loginUser.username,
            headline: req.body.headline
        }
        res.send(msg)
    })
}

const headlines = (req, res) => {
    if ( !req.params.users ) req.params.users = req.loginUser.username
    var users = req.params.users.split(',');
    var headlinesObj = {
        headlines: []
    }
    Profile.find({username: {$in: users}}).exec(function(err, docs) {
        headlinesObj.headlines = docs.map(function(doc) {
            var h = {
                username: doc.username,
                headline: doc.status
            }
            return h
        })
        res.send(headlinesObj)
    })
}

const getEmail = (req, res) => {
    var user
    if ( req.params.user ) user = req.params.user
    else user = req.loginUser.username
    Profile.findOne({username: user}).exec(function(err, doc) {
        res.send({
            username: user,
            email: doc.email
        })
    })
}

const updateEmail = (req, res) => {
    Profile.update({username: req.loginUser.username}, {email: req.body.email})
    .exec(function(err, doc) {
        res.send({
            username: req.loginUser.username,
            email: req.body.email
        })
    })
}

const getZipcode = (req, res) => {
    var user
    if ( req.params.user ) user = req.params.user
    else user = req.loginUser.username
    Profile.findOne({username: user}).exec(function(err, doc) {
        res.send({
            username: user,
            email: doc.zipcode
        })
    })
}

const updateZipcode = (req, res) => {
    Profile.update({username: req.loginUser.username}, {zipcode: req.body.zipcode})
    .exec(function(err, doc) {
        res.send({
            username: req.loginUser.username,
            zipcode: req.body.zipcode
        })
    })
}

const stub = (req, res) => {
    res.send("This is a stub")
}


module.exports = (app) => {
    app.put('/headline', headline)
    app.get('/headlines/:users?', headlines)
    app.get('/email/:user?', getEmail)
    app.put('/email', updateEmail)
    app.get('/zipcode/:user?', getZipcode)
    app.put('/zipcode', updateZipcode)
    app.get('/avatars/:user?', stub)
    app.put('/avatar',stub)
    app.get('/dob', stub)
    app.put('/articles/id',stub)
    app.get('/following/:user?', stub)
    app.put('/following/:user',stub)
    app.delete('/following/:user',stub)
}
