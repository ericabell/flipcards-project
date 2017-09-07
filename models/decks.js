const mongoose = require('mongoose');
ObjectId = require('mongodb').ObjectID;

mongoose.Promise = require('bluebird');

const historySchema = new mongoose.Schema({
  date: Date,
  user: String,
  outcome: String
})

const cardSchema = new mongoose.Schema({
  name: String,
  front: String,
  back: String,
  history: [historySchema]
})

const deckSchema = new mongoose.Schema({
  description: String,
  cards: [cardSchema]
}, {collection: 'decks'});

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Item;
