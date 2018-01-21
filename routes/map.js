var express = require('express');
var router = express.Router();
var database = require('../db/db');


router.get('/', function(require	, res, next) {
	database.findAllUsers(function(err, userResult) {
		if (err) {
            console.error(err);
            res.redirect('/');
        } else {
        	console.log(userResult);
        	res.send(userResult);
        }});
});

module.exports = router;
