var express = require('express');
var router = express.Router();

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
    // res.render('profile', req.params);
    console.log(mockUserData)
    console.log(req.params)
    res.render('profile', mockUserData)
});


module.exports = router;
