var express = require('express');
var router = express.Router();
var database = require('../db/db');


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

router.post('/create/:offerId', function (req, res, next) {
    if (req.session.userId) {
        database.insertOffer(req.body.from_user_id, req.body.to_user_id, req.body.from_user_offered_item_id, req.body.from_user_wanted_item_id, req.body.to_user_offered_item_id, req.body.to_user_wanted_item_id, '2017-02-02', '2017-02-04', function(err, result){
            if (err) {
                res.redirect('offers')
            }
            res.render('../index', {trades: result})
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

