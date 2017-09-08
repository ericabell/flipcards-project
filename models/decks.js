const mongoose = require('mongoose');
ObjectId = require('mongodb').ObjectID;

mongoose.Promise = require('bluebird');

const historySchema = new mongoose.Schema({
  date: Date,
  user: String,
  outcome: String
})

const cardSchema = new mongoose.Schema({
  front: String,
  back: String,
  history: [historySchema]
})

const deckSchema = new mongoose.Schema({
  owner: String,
  public: Boolean,
  description: String,
  cards: [cardSchema]
}, {collection: 'decks'});

deckSchema.statics.allDecks = function() {
  return this.find({});
}

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;
