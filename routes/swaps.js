var express = require('express');
var router = express.Router();
var database = require('../db/db');


router.get('/', function (req, res, next) {
    if (req.session.userId) {
        database.getSwapsByUserId(req.session.userId, function (err, result) {
            if (err) {
                res.redirect('../index')
            }
            res.render('swaps', {trades: result})
        });
    } else {
        res.redirect('../index')
    }
});

module.exports = router;

