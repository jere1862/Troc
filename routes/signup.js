var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportConfig = require('../auth/passport-config')(passport);

router.get('/', function(req, res){
    res.render('signup', {user: req.user});
})

/* GET home page. */
router.post('/', passport.authenticate('local-signup'), function(req, res) {
  res.redirect('index')
});

module.exports = router;
