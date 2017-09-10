var express = require('express');
var router = express.Router();

let Deck = require('../models/decks');

/* GET home page. */
router.get('/', function(req, res, next) {
  if( req.user) {
    Deck.allPublicAndUserDecks(req.user.username)
      .then( (decks) => {
        res.render('index', { title: 'Flipcard',
                              decks: decks,
                              user: req.user.name });
      })
  } else {
    res.render('index', { title: 'Flipcard'
                          });
  }

});

module.exports = router;
