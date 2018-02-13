var Profile = require('./model.js').Profile
var Article = require('./model.js').Article

var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'zh20cloud',
  api_key: '697983262138559',
  api_secret: 'VpU5_y_dPtqUokMfbXHmjVz5Uxg'
});

const getArticles = (req, res) => {
    if ( !req.params.id ) {
        var users = [req.loginUser.username]
        Profile.findOne({username: users[0]}).exec(function(err, doc) {
            users = users.concat(doc.followers)
            Article.find({author: {$in: users}})
            .sort({'_id':-1}).limit(10).exec(function(err, docs) {
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
    if ( req.body.image ) {
        cloudinary.v2.uploader.upload(req.body.image, {upload_preset: "zh20preset"}, function(err,result) {
            new Article({author: req.loginUser.username, img: result.url, date: new Date().getTime(),
                text: req.body.text
            }).save(function(err, doc) {
                res.send({
                    articles:[doc]
                })
            })
        })
    }
    else new Article({author: req.loginUser.username, img: null, date: new Date().getTime(),
        text: req.body.text
    }).save(function(err, doc) {
        res.send({
            articles:[doc]
        })
    })
}

const editArticle = (req, res) => {
    console.log(req.body)
    Article.updateOne({_id: req.body._id}, req.body.change).exec(function(err, doc) {
        res.sendStatus(200)
    })
}

// Article.updateOne({id: 1},{comments: [{
//     text: "updateTest",
//     author: "zh20",
//     date: new Date().getTime()
// }]}).exec()
// Article.remove({text: {$in:["Text adding test1", "Text adding test2"]}}).exec()

module.exports = (app) => {
    app.get('/articles/:id*?', getArticles)
    app.post('/article', newPost)
    app.put('/article', editArticle)
}
