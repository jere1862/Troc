var express = require('express');
var router = express.Router();
var database = require('../db/db');

router.get('/', function (req, res, next) {
    if (req.session.userId) {
        database.getMatchUsersByUserId(req.session.userId, function (err, result) {
            if (err) {
                console.error(err);
                res.redirect('../')
            }
            res.send({matches: result})
        });
    }
});

module.exports = router;
