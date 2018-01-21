var express = require('express');
var router = express.Router();
var database = require('../db/db');

router.get('/', function (req, res, next) {
    if (req.session.userId) {
        database.getMatchUsersByUserId(req.session.userId, function (err, result) {
            if (err) {
                res.redirect('../')
            }
            res.send({matches: result})
        });
    }else{
        res.redirect('../index')
    }
});

module.exports = router;
