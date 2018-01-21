var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportConfig = require('../auth/passport-config')(passport);

router.get('/', function(req, res){
  res.redirect('../')
})

/* GET home page. */
router.post('/', passport.authenticate('local-login', {failureFlash: true}), function(req, res) {
  console.log(req.sessionID);
  res.redirect('../');  
});

module.exports = router;
