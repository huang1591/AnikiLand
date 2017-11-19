// this is model.js
var mongoose = require('mongoose')
var fs = require('fs')
require('./db.js')

var commentSchema = new mongoose.Schema({
	commentId: Number, author: String, date: Date, text: String
})

var articleSchema = new mongoose.Schema({
	id: Number, author: String, img: String, date: Date, text: String,
	comments: [ commentSchema ]
})

var userSchema = new mongoose.Schema({
	username: String, salt: String, saltedPassword: String
})

var profileSchema = new mongoose.Schema({
	username: String, displayName: String, email: String,
	birthDate: String, zipcode: String, phoneNum: String,
	followers: [ String ],
	status: String
})

exports.Article = mongoose.model('article', articleSchema)
exports.User = mongoose.model('user', userSchema)
exports.Profile = mongoose.model('profile', profileSchema)
