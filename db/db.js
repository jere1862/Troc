var mysql = require('mysql');

var api = {
    createConnection: function() {
        return mysql.createConnection({
            host: "mysql3.gear.host",
            user: "hackatown2018",
            password: "Vc07~5q0zi2!",
            database: "hackatown2018"
        });
    },
    
    findAllUsers: function(callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if (err) throw err;

            connection.query("SELECT * FROM user",[],function (err, result) {
                if (err) throw err;
                callback(result)
            });
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

    findVisibleWantedItemsByUserId: function(userId, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if (err) throw err;

            connection.query("SELECT * FROM wanted_item WHERE user_id=? AND visible=TRUE", [userId], function (err, result) {
                if (err) throw err;
                callback(result)
            });
        });
    },

    setWantedItemVisible: function(wantedItemId, visible, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if (err) throw err;

            connection.query("UPDATE wanted_item SET visible=? WHERE id=?", [visible, wantedItemId], function (err, result) {
                if (err) throw err;
                callback(result)
            });
        });
    },

    insertWantedItem: function(userId, name, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if (err) throw err;

            connection.query("INSERT INTO wanted_item(user_id, name) VALUES(?, ?)", [userId, name], function (err, result) {
                if (err) throw err;
                callback(result)
            });
        });
    },

    deleteWantedItem: function(wantedItemId, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if (err) throw err;

            connection.query("DELETE FROM wanted_item WHERE id=?", [wantedItemId], function (err, result) {
                if (err) throw err;
                callback(result)
            });
        });
    },

    findVisibleOfferedItemsByUserId: function(userId, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if (err) throw err;

            connection.query("SELECT * FROM offered_item WHERE user_id=? AND visible=TRUE", [userId], function (err, result) {
                if (err) throw err;
                callback(result)
            });
        });
    },

    setOfferedItemVisible: function(offeredItemId, visible, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if (err) throw err;

            connection.query("UPDATE offered_item SET visible=?  WHERE id=?", [visible, offeredItemId], function (err, result) {
                if (err) throw err;
                callback(result)
            });
        });
    },

    insertOfferedItem: function(user_id, name, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if (err) throw err;

            connection.query("INSERT INTO offered_item(user_id, name) VALUES(?, ?)", [user_id, name], function (err, result) {
                if (err) throw err;
                callback(result)
            });
        });
    },

    deleteOfferedItem: function(offeredItemId, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if (err) throw err;

            connection.query("DELETE FROM offered_item WHERE id=?", [offeredItemId], function (err, result) {
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

    insertOffer: function(from_user_id, to_user_id, from_user_offered_item_id, from_user_wanted_item_id, to_user_offered_item_id, to_user_wanted_item_id, start_date, end_date, callback) {
        var self = this;
        var connection = this.createConnection();
        connection.connect(function(err) {
            var callbackCount = 0;
            if (err) throw err;

            connection.query("INSERT INTO offer(from_user_id, to_user_id, from_user_offered_item_id, from_user_wanted_item_id, to_user_offered_item_id, to_user_wanted_item_id, start_date, end_date) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
                [from_user_id, to_user_id, from_user_offered_item_id, from_user_wanted_item_id, to_user_offered_item_id, to_user_wanted_item_id, start_date, end_date], function (err, result) {
                if (err) throw err;
                callbackCount++;
                if (callbackCount == 5) callback(result);
            });
            self.setOfferedItemVisible(from_user_offered_item_id, false, function(result) {
                callbackCount++;
                if (callbackCount == 5) callback(result);
            });
            self.setWantedItemVisible(from_user_wanted_item_id, false, function(result) {
                callbackCount++;
                if (callbackCount == 5) callback(result);
            });
            self.setOfferedItemVisible(to_user_offered_item_id, false, function(result) {
                callbackCount++;
                if (callbackCount == 5) callback(result);
            });
            self.setWantedItemVisible(to_user_wanted_item_id, false, function(result) {
                callbackCount++;
                if (callbackCount == 5) callback(result);
            });
        });
    },

    acceptOffer: function(offerId, callback) {
        var self = this;
        var connection = this.createConnection();
        connection.connect(function(err) {
            if (err) throw err;

            connection.query("SELECT * FROM offer WHERE id=?", [offerId], function (err, result) {
                var callbackCount = 0;
                if (err) throw err;
                var offer = result[0];

                connection.query("DELETE FROM offer WHERE id=?", [offerId], function(err, result) {
                    if (err) throw err;
                    callbackCount++;
                    if (callbackCount == 2) callback(result);
                });

                self.insertSwap(offer.from_user_id, offer.to_user_id, offer.from_user_offered_item_id, offer.from_user_wanted_item_id,
                                offer.to_user_offered_item_id, offer.to_user_wanted_item_id, offer.start_date, offer.end_date, function(result) {
                    callbackCount++;
                    if (callbackCount == 2) callback(result);
                });
            });
        });
    },

    refuseOffer: function(offerId, callback) {
        var self = this;
        var connection = this.createConnection();
        connection.connect(function(err) {
            if (err) throw err;

            connection.query("SELECT * FROM offer WHERE id=?", [offerId], function (err, result) {
                var callbackCount = 0;
                if (err) throw err;
                var offer = result[0];

                connection.query("DELETE FROM offer WHERE id=?", [offerId], function(err, result) {
                    if (err) throw err;
                    callbackCount++;
                    if (callbackCount == 5) callback(result);
                });

                self.setOfferedItemVisible(offer.from_user_offered_item_id, true, function(result) {
                    callbackCount++;
                    if (callbackCount == 5) callback(result);
                });
                self.setWantedItemVisible(offer.from_user_wanted_item_id, true, function(result) {
                    callbackCount++;
                    if (callbackCount == 5) callback(result);
                });
                self.setOfferedItemVisible(offer.to_user_offered_item_id, true, function(result) {
                    callbackCount++;
                    if (callbackCount == 5) callback(result);
                });
                self.setWantedItemVisible(offer.to_user_wanted_item_id, true, function(result) {
                    callbackCount++;
                    if (callbackCount == 5) callback(result);
                });
            });
        });
    },

    insertSwap: function(from_user_id, to_user_id, from_user_offered_item_id, from_user_wanted_item_id, to_user_offered_item_id, to_user_wanted_item_id, start_date, end_date, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if (err) throw err;

            connection.query("INSERT INTO swap(from_user_id, to_user_id, from_user_offered_item_id, from_user_wanted_item_id, to_user_offered_item_id, to_user_wanted_item_id, start_date, end_date) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
                [from_user_id, to_user_id, from_user_offered_item_id, from_user_wanted_item_id, to_user_offered_item_id, to_user_wanted_item_id, start_date, end_date], function (err, result) {
                    if (err) throw err;
                    callback(result);
                });
        });
    },

    deleteSwap: function(swapId, callback) {
        var self = this;
        var connection = this.createConnection();
        connection.connect(function(err) {
            if (err) throw err;

            connection.query("SELECT * FROM swap WHERE id=?", [swapId], function (err, result) {
                var callbackCount = 0;
                if (err) throw err;
                var offer = result[0];

                connection.query("DELETE FROM swap WHERE id=?", [swapId], function(err, result) {
                    if (err) throw err;
                    callbackCount++;
                    if (callbackCount == 5) callback(result);
                });

                self.setOfferedItemVisible(offer.from_user_offered_item_id, true, function(result) {
                    callbackCount++;
                    if (callbackCount == 5) callback(result);
                });
                self.deleteWantedItem(offer.from_user_wanted_item_id, function(result) {
                    callbackCount++;
                    if (callbackCount == 5) callback(result);
                });
                self.setOfferedItemVisible(offer.to_user_offered_item_id, true, function(result) {
                    callbackCount++;
                    if (callbackCount == 5) callback(result);
                });
                self.deleteWantedItem(offer.to_user_wanted_item_id, function(result) {
                    callbackCount++;
                    if (callbackCount == 5) callback(result);
                });
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
