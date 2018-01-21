var express = require('express');
var router = express.Router();
var database = require('../db/db');

/* GET home page. */
router.get('/', function(req, res, next) {
	database.findAllUsers(function(err, userResult) {
		if (err) {
            console.error(err);
            /*res.redirect('../index');*/
        } else {
        	console.log(userResult);
        }});
  res.render('index', { title: 'Express' });
});

module.exports = router;
