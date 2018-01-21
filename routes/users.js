var express = require('express');
var router = express.Router();
var database = require('../db/db');

var mockUserData = {
    name: "Jean-Roger",
    email: "rogerJJ@gmail.com",
    phone: "418-225-1454",
    address: "480 28e avenue nord, St-Georges",
    offeredItems: ["Lord of the Rings: The twin towers", "Harry Potter: THE FIRST ONE"],
    wantedItems: ["A song of ice and fire: tome one", "A drill"]
};


/* GET users listing. */
router.get('/:userId', function (req, res, next) {
    database.findUserById(req.params.userId, function (err, userResult) {
        if (err) {
            console.error(err);
            res.redirect('../index');
        } else {
            console.log(userResult);
            database.findVisibleOfferedItemsByUserId(req.params.userId, function (err, offeredItemResult) {
                if (err) {
                    console.error(err);
                    res.redirect('../index');
                } else {
                    console.log(offeredItemResult);
                    database.findVisibleWantedItemsByUserId(req.params.userId, function (err, wanteditemResult) {
                        if (err) {
                            console.error(err);
                            res.redirect('../index');
                        } else {
                            result = {user: userResult[0], offeredItems: offeredItemResult, wantedItems: wanteditemResult};
                            console.log(result);
                            res.render('profile', result)
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;
