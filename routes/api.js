var express = require('express');
var router = express.Router();
const passport = require('passport');


let Deck = require('../models/decks');
let User = require('../models/users.js');

// NOTE:
// we can register a user without needing http basic auth,
// but ALL THE OTHER API ROUTES require http basic auth

/* REGISTER A USER */
router.post('/user', (req, res, next) => {
  User.create({username: req.body.username,
               password: req.body.password,
               name: req.body.name
             })
    .then( (doc) => {
      console.log(doc);
      console.log('user created successfully!');
      res.json({status: 'success',
                data: {
                  username: doc.username,
                  name: doc.name
                }});
    })
    .catch( (err) => {
      res.status(400).json({status: 'failure', data: err});
    })
});


/* CREATE A NEW DECK */
router.post('/deck', passport.authenticate('basic', {session: false}), (req, res, next) => {
  console.log(req.body);
  Deck.create({description: req.body['deck-name'],
               owner: req.user.username,
               public: (req.body.access === 'public')})
    .then( (result) => {
      console.log(`Deck created: ${result}`);
      res.json(result);
    })
})

/* LIST DECKS */
router.get('/deck', passport.authenticate('basic', {session: false}), (req, res, next) => {
  Deck.allDecks({})
    .then( (decks) => {
      res.json(decks);
    })
})

/* ADD CARD TO DECK */
router.post('/card', passport.authenticate('basic', {session: false}), (req, res, next) => {
  console.log(req.body);
  Deck.findByIdAndUpdate(req.body.deckId,
    {$push: {'cards': {front: req.body.front, back: req.body.back}}},
    {safe: true, upsert: false})
    .then( (result) => {
      res.json(result);
    })
})

/* EDIT EXISTING CARD */
router.put('/card', passport.authenticate('basic', {session: false}), (req, res, next) => {
  Deck.findById(req.body.deckId)
    .then( (deck) => {
      deck.cards.id(req.body.cardId).front = req.body.front;
      deck.cards.id(req.body.cardId).back = req.body.back;
      deck.save()
        .then( (results) => {
          res.json(results);
        })
    })
})

/* DELETE A CARD FROM A DECK */
router.delete('/card', passport.authenticate('basic', {session: false}), (req, res, next) => {
  Deck.findById(req.body.deckId)
    .then( (deck) => {
      deck.cards.id(req.body.cardId).remove();
      deck.save()
        .then( (result) => {
          res.json(result);
        })
    })
})


module.exports = router;
