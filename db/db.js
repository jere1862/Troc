var mysql = require('mysql');

var api = {
    createConnection: function() {
        return mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "12345678",
            database: "swap_database"
        });
    },
    
    findUserAndPasswordById: function(id, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if (err) throw err;

            connection.query("SELECT * FROM user WHERE id=?", [id], function (err, result) {
                if (err) throw err;
                callback(result)
            });
        });
    },
    
    findUserAndPasswordByEmail: function(email, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if (err) throw err;

            connection.query("SELECT * FROM user WHERE email=?", [email], function (err, result) {
                if (err) throw err;
                callback(result)
            });
        });
    },

    getUserAddresses: function(callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if (err) throw err;

            connection.query("SELECT id, address FROM user", function (err, result) {
                if (err) throw err;
                callback(result)
            });
        });
    },

    findUserById: function(id, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if (err) throw err;

            connection.query("SELECT id, name, email, phone, address FROM user WHERE id=?", [id], function (err, result) {
                if (err) throw err;
                callback(result)
            });
        });
    },

    findWantedItemsByUserId: function(userId, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if (err) throw err;

            connection.query("SELECT * FROM wanted_item WHERE user_id=? AND deleted = FALSE", [userId], function (err, result) {
                if (err) throw err;
                callback(result)
            });
        });
    },

    insertUser: function(name, email, phone, address, password, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if (err) throw err;

            connection.query("INSERT INTO user(name, email, phone, address, password) VALUES(?, ?, ?, ?, ?)", [name, email, phone, address, password], function (err, result) {
                if (err) throw err;
                callback(result)
            });
        });
    },

    findOfferItemsByUserId: function(userId, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if (err) throw err;

            connection.query("SELECT * FROM offered_item WHERE user_id=? AND deleted = FALSE", [userId], function (err, result) {
                if (err) throw err;
                callback(result)
            });
        });
    },

    getOffersByToUserId: function(toUserId, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if (err) throw err;

            connection.query("SELECT offer.id, \
                                     from_user_id, \
                                     to_user_id, \
\
                                     from_user_offered_item_id, \
                                     from_offered_item.name as from_user_offered_item_name, \
                                     from_user_wanted_item_id, \
                                     from_wanted_item.name as from_user_wanted_item_name, \
\
                                     to_user_offered_item_id, \
                                     to_offered_item.name as to_user_offered_item_name, \
                                     to_user_wanted_item_id, \
                                     to_wanted_item.name as to_user_wanted_item_name, \
\
                                     start_date, \
                                     end_date \
                              FROM offer \
                              INNER JOIN offered_item as from_offered_item ON from_offered_item.id = from_user_offered_item_id \
                              INNER JOIN wanted_item as from_wanted_item ON from_wanted_item.id = from_user_wanted_item_id \
                              INNER JOIN offered_item as to_offered_item ON to_offered_item.id = to_user_offered_item_id \
                              INNER JOIN wanted_item as to_wanted_item ON to_wanted_item.id = to_user_wanted_item_id \
                              WHERE to_user_id=?", [toUserId], function (err, result) {
                if (err) throw err;
                callback(result)
            });
        });
    },

    getSwapsByUserId: function(userId, callback) {
        var connection = this.createConnection();
        connection.connect(function (err) {
            if (err) throw err;

            connection.query("SELECT swap.id, \
                                     from_user_id, \
                                     to_user_id, \
\
                                     from_user_offered_item_id, \
                                     from_offered_item.name as from_user_offered_item_name, \
                                     from_user_wanted_item_id, \
                                     from_wanted_item.name as from_user_wanted_item_name, \
\
                                     to_user_offered_item_id, \
                                     to_offered_item.name as to_user_offered_item_name, \
                                     to_user_wanted_item_id, \
                                     to_wanted_item.name as to_user_wanted_item_name, \
\
                                     start_date, \
                                     end_date \
                              FROM swap \
                              INNER JOIN offered_item as from_offered_item ON from_offered_item.id = from_user_offered_item_id \
                              INNER JOIN wanted_item as from_wanted_item ON from_wanted_item.id = from_user_wanted_item_id \
                              INNER JOIN offered_item as to_offered_item ON to_offered_item.id = to_user_offered_item_id \
                              INNER JOIN wanted_item as to_wanted_item ON to_wanted_item.id = to_user_wanted_item_id \
                              WHERE to_user_id=? or from_user_id=?", [userId, userId], function (err, result) {
                if (err) throw err;
                callback(result)
            })
        });
    }


};

module.exports = api;
