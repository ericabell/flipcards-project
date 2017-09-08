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
  Deck.create({description: req.body['deck-name']})
    .then( (result) => {
      console.log(`Deck created: ${result}`);
      res.redirect('/');
    })
});

/* EDIT A DECK */
router.get('/deck/edit/:id', function(req, res, next) {
  Deck.find({'_id': req.params.id})
    .then( (deck) => {
      res.render('edit-deck', {title: 'Edit Deck',
                               deck: deck});
    })
})

module.exports = router;
