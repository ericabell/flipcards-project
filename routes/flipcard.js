var express = require('express');
var router = express.Router();

let Deck = require('../models/decks');

/* CREATE A NEW DECK */
router.get('/create-deck', function(req, res, next) {
  res.render('create-deck', {title: 'Create Deck'});

});

router.post('/create-deck', (req, res, next) => {
  console.log(req.body);
  // create a new document in the decks collection
  Deck.create({description: req.body['deck-name'],
               owner: req.user.username,
               public: (req.body.access === 'public')})
    .then( (result) => {
      console.log(`Deck created: ${result}`);
      res.redirect('/');
    })
});

/* DELETE A DECK */

router.get('/deck/delete/:id', function(req, res, next) {
  Deck.findOne({'_id': req.params.id})
    .then( (deck) => {
      deck.remove();
      deck.save()
        .then( (results) => {
          console.log('Deck removed!');
          res.redirect('/');
        })
    })
})

/* EDIT A DECK */
router.get('/deck/edit/:id', function(req, res, next) {
  Deck.findOne({'_id': req.params.id})
    .then( (deck) => {
      res.render('edit-deck', {title: 'Edit Deck',
                               deck: deck});
    })
})

/* add a new card to a deck */
router.post('/deck/card/add', function(req, res, next) {
  console.log(req.body);
  // get the deck id from the query String
  let deckId = req.body.deckId;
  // get the front and back of the card from the body of the post
  let front = req.body.front;
  let back = req.body.back;

  Deck.findByIdAndUpdate(deckId,
    {$push: {'cards': {front: front, back: back}}},
    {safe: true, upsert: true})
    .then( (result) => {
      res.redirect(`/flipcard/deck/edit/${deckId}`);
    })

})

/* edit a card from a deck */
router.get('/deck/card/update/:id', function(req, res, next) {
  let deckId = req.query.deck;
  console.log(deckId);

  Deck.findById(deckId)
    .then( (deck) => {
      console.log(deck.cards.id(req.params.id));
      res.render('edit-deck', {title: 'Edit Deck',
                                 deck: deck,
                                 card: deck.cards.id(req.params.id)})
    })
})

router.post('/deck/card/update/:id', function(req, res, next) {
  let deckId = req.query.deck;
  console.log(deckId);

  Deck.findById(deckId)
    .then( (deck) => {
      deck.cards.id(req.params.id).front = req.body.front;
      deck.cards.id(req.params.id).back = req.body.back;
      deck.save()
        .then( (results) => {
          res.redirect(`/flipcard/deck/edit/${deckId}`);
        })
    })
})


/* delete a card from a deck */
router.get('/deck/card/delete/:id', function(req, res, next) {
  let deckId = req.query.deck;
  console.log(deckId);

  Deck.findById(deckId)
    .then( (deck) => {
      deck.cards.id(req.params.id).remove();
      deck.save()
        .then( (result) => {
          console.log('card deleted!');
          res.redirect(`/flipcard/deck/edit/${deckId}`)
        })
    })
})

module.exports = router;
