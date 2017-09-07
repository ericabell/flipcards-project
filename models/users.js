const mongoose = require('mongoose');
ObjectId = require('mongodb').ObjectID;

mongoose.Promise = require('bluebird');

const userSchema = new mongoose.Schema({
  displayName: String,
  username: String,
  password: String
}, {collection: 'users'});

const User = mongoose.model('User', userSchema);

module.exports = User;
