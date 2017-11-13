// this is dbarticle.js
var Article = require('./model.js').Article

function find(req, res) {
     findByAuthor(req.params.user, function(items) {
          res.send({items})
     })
}

function changeText(req, res) {
    Article.update({author: "mrj1"},{text: req.body.text},{multi: true})
    .exec(function(err, _){})
    console.log('Request payload       :', req.body)
    res.end()
}

module.exports = (app) => {
     app.get('/find/:user', find)
     app.post('/change/:id', changeText)
}


function findByAuthor(author, callback) {
	Article.find({ author: author }).exec(function(err, items) {
		console.log('There are ' + items.length + ' entries for ' + author)
		var totalLength = 0
		items.forEach(function(article) {
			totalLength += article.text.length
		})
		console.log('average length', totalLength / items.length)
		callback(items)
	})
}

//////////////////////////////
// remove these examples

// new Article({ id: 1, author: 'mrj1', img: null, date: new Date().getTime(), text: 'This is my first article'}).save()
// new Article({ id: 2, author: 'mrj1', img: null, date: new Date().getTime(), text: 'This is my second article'}).save()
// new Article({ id: 3, author: 'jmg3', img: null, date: new Date().getTime(), text: "This is Max's article"}).save(function() {
//      console.log('done with save')
//      Article.find().exec(function(err, items) {
//           console.log("There are " + items.length + " articles total in db")
//
//           findByAuthor('mrj1', function() {
//               findByAuthor('jmg3', function() {
//                   console.log('complete')
//                   process.exit()
//               })
//           })
//      })
// })

//////////////////////////////
// remove the above example code
//////////////////////////////
