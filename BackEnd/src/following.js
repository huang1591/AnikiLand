var Profile = require('./model.js').Profile

const getFollowers = (req, res) => {
    Profile.findOne({username: req.loginUser.username}).exec(function(err, doc) {
        Profile.find({username: {$in: doc.followers}}, {username: 1, status: 1, avatar: 1})
        .exec(function(err, docs) {
            res.send({
                username: req.loginUser.username,
                following: docs
            })
        })
    })
}

const addFollower = (req, res) => {
    Profile.findOne({username: req.params.user}).exec(function(err, _doc) {
        if ( _doc ) {
            Profile.findOne({username: req.loginUser.username}).exec(function(err, doc) {
                if ( !doc.followers.find(f => f == req.params.user) )
                doc.followers.push(req.params.user)
                Profile.updateOne({username: req.loginUser.username}, {followers: doc.followers}).exec(function(err, doc1) {
                    res.send({
                        username: req.loginUser.username,
                        following: doc.followers
                    })
                })
            })
        }
        else res.sendStatus(400)
    })
}

const deleteFollower = (req, res) => {
    Profile.findOne({username: req.loginUser.username}).exec(function(err, doc) {
        doc.followers = doc.followers.filter(follower => follower != req.params.user)
        Profile.updateOne({username: req.loginUser.username}, {followers: doc.followers}).exec(function(err, doc1) {
            res.send({
                username: req.loginUser.username,
                following: doc.followers
            })
        })
    })
}


module.exports = (app) => {
    app.get('/following/:user?', getFollowers)
    app.put('/following/:user', addFollower)
    app.delete('/following/:user', deleteFollower)
}
