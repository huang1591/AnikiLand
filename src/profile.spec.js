const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Headline put test', () => {
    it('should update the headline', (done) => {
        fetch(url('/headline'),{
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body:'{"headline" : "headline change test000"}'
        })
        .then(res => {
            expect(res.status).to.eql(200)
            return res.json()
        })
        .then(res1 => {
            fetch(url('/headlines'))
            .then(res => {
                return res.json()
            })
            .then(res2 => {
                expect(res1.headline).to.eql(res2.headlines[0].headline)
            })
            .then(done)
            .catch(done)
        })
    }, 200)
});
