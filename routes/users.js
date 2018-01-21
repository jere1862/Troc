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

function getAndRenderUserInfo(id, res) {
    database.findUserById(id, function (err, userResult) {
        if (err) {
            console.error(err);
            res.redirect('../index');
        } else {
            console.log(userResult);
            database.findVisibleOfferedItemsByUserId(id, function (err, offeredItemResult) {
                if (err) {
                    console.error(err);
                    res.redirect('../index');
                } else {
                    console.log(offeredItemResult);
                    database.findVisibleWantedItemsByUserId(id, function (err, wanteditemResult) {
                        if (err) {
                            console.error(err);
                            res.redirect('../index');
                        } else {
                            result = {
                                user: userResult[0],
                                offeredItems: offeredItemResult,
                                wantedItems: wanteditemResult
                            };
                            console.log(result);
                            res.render('profile', result)
                        }
                    });
                }
            });
        }
    });
}


/* GET users listing. */
router.get('/:userId', function (req, res, next) {
    getAndRenderUserInfo(req.params.userId, res)

});

router.post('/:userId', function (req, res, next) {
    console.log(req.body);
    if (req.body.item_offered_name != null) {
        database.insertOfferedItem(req.params.userId, req.body.item_offered_name, function (err, response) {
            if (err) {
                console.error(err);
                res.redirect('/');
            } else {
                getAndRenderUserInfo(req.params.userId, res)
            }
        });
    } else {
        database.insertWantedItem(req.params.userId, req.body.item_wanted_name, function (err, response) {
            if (err) {
                console.error(err);
                res.redirect('/');
            } else {
                getAndRenderUserInfo(req.params.userId, res)
            }
        });
    }
});

module.exports = router;
