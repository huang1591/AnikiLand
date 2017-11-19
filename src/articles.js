var Profile = require('./model.js').Profile
var Article = require('./model.js').Article

const getArticles = (req, res) => {
    if ( !req.params.id ) {
        var users = [req.loginUser.username]
        Profile.findOne({username: users[0]}).exec(function(err, doc) {
            users = users.concat(doc.followers)
            Article.find({author: {$in: users}}).exec(function(err, docs) {
                res.send({
                    articles: docs
                })
            })
        })
    }
    else if ( req.params.id.length == 24 ) {
        Article.findOne({_id: req.params.id}).exec(function(err, doc) {
            res.send({
                articles: [doc]
            })
        })
    }
    else {
        Article.find({author: req.params.id}).exec(function(err, docs) {
            res.send({
                articles: docs
            })
        })
    }
}

const newPost = (req, res) => {
    var img = null
    if ( req.body.image ) {}
    new Article({author: req.loginUser.username, img: img, date: new Date().getTime(),
        text: req.body.text
    }).save(function(err, doc) {
        res.send({
            articles:[doc]
        })
    })
}

module.exports = (app) => {
    app.get('/articles/:id*?', getArticles)
    app.post('/article', newPost)
}
