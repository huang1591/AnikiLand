/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')
var Article = require('./model.js').Article

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('post a new article increase the number of articles by one', (done) => {
		// add a new article
		// verify you get the article back with an id
		// verify the content of the article
		// add a second article
		// verify the article id increases by one
		// verify the second artice has the correct content
		Article.find().exec(function(err, docs) {
			var id1 = docs.length
			fetch(url('/article'),{
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: '{"text": "Text adding test1"}'
				})
			.then(res => {
				expect(res.status).to.eql(200)
				return res.json()
				})
			.then(article => {
				expect(article.articles[0].text).to.eql("Text adding test1")
				return article.articles[0]
			})
			.then(article =>
				Article.find().exec(function(err, docs) {
					var id2 = docs.length
					expect(id2).to.eql(id1+1)
					done()
				})
			)
		})
		//done(new Error('Not implemented'))
 	}, 200)

});
