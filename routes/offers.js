var express = require('express');
var router = express.Router();
var database = require('../db/db');
var util = require('util');


router.get('/', function (req, res, next) {
    if (req.session.userId) {
        database.getOffersByToUserId(req.session.userId, function (err, result) {
            if (err) {
                res.redirect('../index')
            }
            res.render('offers', {trades: result})
        });
    } else {
        res.redirect('../index')
    }
});

router.post('/accept/:offerId', function (req, res, next) {
    if (req.session.userId) {
        database.acceptOffer(req.params.offerId, function (err, result) {
            if (err) {
                res.redirect('../index')
            }
            res.render('offers', {trades: result})
        });
    } else {
        res.redirect('../index')
    }
});

router.post('/deny/:offerId', function (req, res, next) {
    if (req.session.userId) {
        database.denyOffer(req.params.offerId, function (err, result) {
            if (err) {
                res.redirect('../index')
            }
            res.render('offers', {trades: result})
        });
    } else {
        res.redirect('../index')
    }
});

module.exports = router;

