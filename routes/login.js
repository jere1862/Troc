var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportConfig = require('../auth/passport-config')(passport);

router.get('/', function(req, res){
    console.log(Object.keys(req.session));
    res.render('login', {user: req.user});
})

/* GET home page. */
router.post('/', passport.authenticate('local-login'), function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
