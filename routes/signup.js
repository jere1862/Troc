var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportConfig = require('../auth/passport-config')(passport);

router.get('/', function(req, res){
    res.render('signup', {user: req.user});
})


router.post('/', passport.authenticate('local-signup', {successRedirect: '../', failureRedirect: '../'}), function(req, res) {
  res.redirect('../');
});

module.exports = router;
