var User = require('./model.js').User
var Profile = require('./model.js').Profile
var Article = require('./model.js').Article

var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'zh20cloud',
  api_key: '697983262138559',
  api_secret: 'VpU5_y_dPtqUokMfbXHmjVz5Uxg'
});

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
            zipcode: doc.zipcode
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

const avatars = (req, res) => {
    if ( !req.params.users ) req.params.users = req.loginUser.username
    var users = req.params.users.split(',');
    var avatarsObj = {
        avatars: []
    }
    Profile.find({username: {$in: users}}).exec(function(err, docs) {
        avatarsObj.avatars = docs.map(function(doc) {
            var h = {
                username: doc.username,
                avatar: doc.avatar
            }
            return h
        })
        res.send(avatarsObj)
    })
}

const getBirthDate = (req, res) => {
    var user
    if ( req.params.user ) user = req.params.user
    else user = req.loginUser.username
    Profile.findOne({username: user}).exec(function(err, doc) {
        res.send({
            username: user,
            birthDate: doc.birthDate
        })
    })
}

const updateBirthDate = (req, res) => {
    Profile.update({username: req.loginUser.username}, {birthDate: req.body.birthDate})
    .exec(function(err, doc) {
        res.send({
            username: req.loginUser.username,
            zipcode: req.body.birthDate
        })
    })
}

const getDispName = (req, res) => {
    var user
    if ( req.params.user ) user = req.params.user
    else user = req.loginUser.username
    Profile.findOne({username: user}).exec(function(err, doc) {
        res.send({
            username: user,
            displayName: doc.displayName
        })
    })
}

const updateDispName = (req, res) => {
    Profile.update({username: req.loginUser.username}, {displayName: req.body.displayName})
    .exec(function(err, doc) {
        res.send({
            username: req.loginUser.username,
            displayName: req.body.displayName
        })
    })
}

const getProfile = (req, res) => {
    Profile.findOne({username: req.loginUser.username}).exec(function(err, doc) {
        res.send({
            profile: doc
        })
    })
}

const updateProfile = (req, res) => {
    Profile.updateOne({username: req.loginUser.username}, req.body).exec(function(err, doc) {
        res.end()
    })
}

const avatar = (req, res) => {
    cloudinary.v2.uploader.upload(req.body.file, {upload_preset: "zh20preset"}, function(err,result) {
        Profile.updateOne({username: req.loginUser.username},{avatar: result.url}).exec(function(err, doc) {
            res.send({
                newAvatar: result.url
            })
        })
    })
}


module.exports = (app) => {
    app.put('/headline', headline)
    app.get('/headlines/:users?', headlines)
    app.get('/email/:user?', getEmail)
    app.put('/email', updateEmail)
    app.get('/zipcode/:user?', getZipcode)
    app.put('/zipcode', updateZipcode)
    app.get('/avatars/:users?', avatars)
    app.put('/avatar', avatar)
    app.get('/dob', getBirthDate)
    app.put('/dob', updateBirthDate)
    app.get('/dispName', getDispName)
    app.put('/dispName', updateDispName)
    app.get('/profile', getProfile)
    app.put('/profile', updateProfile)
}
