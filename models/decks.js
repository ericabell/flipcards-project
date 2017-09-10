const mongoose = require('mongoose');
ObjectId = require('mongodb').ObjectID;

mongoose.Promise = require('bluebird');

const historySchema = new mongoose.Schema({
  date: Date,
  user: String,
  outcome: String
})

const cardSchema = new mongoose.Schema({
  front: {
    type: String,
    required: true,
  },
  back: {
    type: String,
    required: true,
  },
  history: [historySchema]
})

const deckSchema = new mongoose.Schema({
  owner: {
      type: String,
      required: true,
  },
  public: {
      type: Boolean,
      required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cards: [cardSchema]
}, {collection: 'decks'});

deckSchema.statics.allDecks = function() {
  return this.find({});
}

deckSchema.statics.allPublicDecks = function() {
  return this.find({public: true});
}

deckSchema.statics.allPrivateUserDecks = function(username) {
  return this.find({public: false, owner: username});
}

deckSchema.statics.allPublicAndUserDecks = function(username) {
  return this.find().or([{public: true}, {owner: username}]);
}

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;
