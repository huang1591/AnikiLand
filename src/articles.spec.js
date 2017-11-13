/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		// IMPLEMENT ME

		fetch(url('/articles')).then(res => {
			expect(res.status).to.eql(200)
			return res.json()
		})
		.then(article => {
			expect( article.articles.length ).to.be.at.least(3)
		})
		.then(done)
		.catch(done)
		//done(new Error('Not implemented'))
 	}, 200)

	it('should add two articles with successive article ids, and return the article each time', (done) => {
		// add a new article
		// verify you get the article back with an id
		// verify the content of the article
		// add a second article
		// verify the article id increases by one
		// verify the second artice has the correct content
		fetch(url('/article'),{
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: '{"author": "Huang", "text": "This is one text"}'
			})
		.then(res => {
			expect(res.status).to.eql(200)
			return res.json()
			})
		.then(article => {
			expect(article).to.have.property('id')
			expect(article.text).to.eql("This is one text")
			return article
		})
		.then(article =>
			fetch(url('/article'),{
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: '{"author": "Huang", "text": "This is another text"}'
			}).then(res => {
				expect(res.status).to.eql(200)
				return res.json()
			}).then(article2 => {
				expect(article2.id).to.eql(article.id+1)
				expect(article2.text).to.eql("This is another text")
			})
		)

		.then(done)
		.catch(done)

		//done(new Error('Not implemented'))
 	}, 200)

	it('should return an article with a specified id', (done) => {
		// call GET /articles first to find an id, perhaps one at random
		// then call GET /articles/id with the chosen id
		// validate that only one article is returned
		//done(new Error('Not implemented'))

		fetch(url('/articles'))
		.then(res => {
			expect(res.status).to.eql(200)
			return res.json()
		})
		.then( article => {
			let i = Math.floor((Math.random()*article.articles.length+1))
			return article.articles.find(r => r.id == i)
		})
		.then( ca =>
			fetch(url(`/articles/${ca.id}`))
			.then(res => {
				expect(res.status).to.eql(200)
				return res.json()
				})
				.then( ga => {expect(ga.id).to.eql(ca.id)} )
		)
		.then(done)
		.catch(done)
	}, 200)

	it('should return nothing for an invalid id', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results
		//done(new Error('Not implemented'))
		fetch(url('/articles/0'))
		.then(res => {
			expect(res.status).to.eql(200)
			return res.text()
		})
		.then(a => {expect(a).to.eql('')})
		.then(done)
		.catch(done)
	}, 200)

});
