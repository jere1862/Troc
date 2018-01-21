var express = require('express');
var router = express.Router();

var mockTradeData = {trades: [{
    offered_name: "john",
    offerer_name: "l'autre",
    offered_items: ["something", "something else"],
    against_items: ["some", "thangs"]
}, {
    offered_name: "yooo",
    offerer_name: "Landry",
    offered_items: ["asdasdsad", "test else"],
    against_items: ["yooo", "gggthankg"]
}]};

var emptyTradeMock = {trades: []}

router.get('/', function (req, res, next) {
    res.render('offers', mockTradeData)
});

module.exports = router;

