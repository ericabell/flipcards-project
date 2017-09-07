var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if( req.user) {
    res.render('index', { title: 'Flipcard',
                          user: req.user.name });
  } else {
    res.render('index', { title: 'Flipcard'
                          });
  }

});

module.exports = router;
