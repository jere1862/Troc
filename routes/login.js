var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportConfig = require('../auth/passport-config')(passport);

router.get('/', function(req, res){
    res.render('login', {user: req.user});
})

/* GET home page. */
router.post('/', passport.authenticate('local-login', {failureRedirect: '../', failureFlash: true}), function(req, res) {
  req.session.userId = req.user.id;
  res.redirect('../');
});

module.exports = router;
