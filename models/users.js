const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
ObjectId = require('mongodb').ObjectID;

mongoose.Promise = require('bluebird');

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  name: String
});

userSchema.virtual('password')
  .get(function () { return null })
  .set(function(value) {
    const hash = bcrypt.hashSync(value, 8);
    this.passwordHash = hash;
  })

userSchema.methods.authenticate = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
