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
             },
    function(err, doc) {
      if( err ) throw err;
      console.log(doc);
      console.log('user created successfully!');
      res.json(doc);
    });
});

/* CREATE A NEW DECK */
router.post('/deck', passport.authenticate('basic', {session: false}), (req, res, next) => {
  Deck.create({description: req.body['deck-name'],
               owner: req.user.username,
               public: (req.body.access === 'public')})
    .then( (result) => {
      console.log(`Deck created: ${result}`);
      res.json(result);
    })
})

/* ADD CARD TO DECK */
router.post('/card', passport.authenticate('basic', {session: false}), (req, res, next) => {
  Deck.findByIdAndUpdate(req.body.deckId,
    {$push: {'cards': {front: req.body.front, back: req.body.back}}},
    {safe: true, upsert: true})
    .then( (result) => {
      res.json(result);
    })
})

/* EDIT EXISTING CARD */
router.put('/card', passport.authenticate('basic', {session: false}), (req, res, next) => {

})

/* DELETE A CARD FROM A DECK */
router.delete('/card', passport.authenticate('basic', {session: false}), (req, res, next) => {

})


module.exports = router;
