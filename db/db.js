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
            if(err) return callback(err);
            connection.query("SELECT * FROM user WHERE id=?", [id], function (err, result) {
                callback(err, result)
            });
        });
    },
    
    findUserAndPasswordByEmail: function(email, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if(err) return callback(err);
            connection.query("SELECT * FROM user WHERE email=?", [email], function (err, result) {
                callback(err, result)
            });
        });
    },

    getUserAddresses: function(callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if(err) return callback(err);
            connection.query("SELECT id, address FROM user", function (err, result) {
                callback(err, result)
            });
        });
    },

    findUserById: function(id, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if(err) return callback(err);
            connection.query("SELECT id, name, email, phone, address FROM user WHERE id=?", [id], function (err, result) {
                callback(err, result)
            });
        });
    },

    insertUser: function(name, email, phone, address, password, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if(err) return callback(err);
            connection.query("INSERT INTO user(name, email, phone, address, password) VALUES(?, ?, ?, ?, ?)", [name, email, phone, address, password], function (err, result) {
                if(err) return callback(err);
                connection.query("SELECT LAST_INSERT_ID() as id", function(err, result) {
                    if(err) return callback(err);
                    callback(err, result[0])
                });
            });
        });
    },

    findVisibleWantedItemsByUserId: function(userId, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if(err) return callback(err);
            connection.query("SELECT * FROM wanted_item WHERE user_id=? AND visible=TRUE", [userId], function (err, result) {
                callback(err, result)
            });
        });
    },

    setWantedItemVisible: function(wantedItemId, visible, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if(err) return callback(err);            
            connection.query("UPDATE wanted_item SET visible=? WHERE id=?", [visible, wantedItemId], function (err, result) {
                callback(err, result)
            });
        });
    },

    insertWantedItem: function(userId, name, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if(err) return callback(err);
            connection.query("INSERT INTO wanted_item(user_id, name) VALUES(?, ?)", [userId, name], function (err, result) {
                callback(err, result)
            });
        });
    },

    deleteWantedItem: function(wantedItemId, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if(err) return callback(err);
            connection.query("DELETE FROM wanted_item WHERE id=?", [wantedItemId], function (err, result) {
                callback(err, result)
            });
        });
    },

    findVisibleOfferedItemsByUserId: function(userId, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if(err) return callback(err);
            connection.query("SELECT * FROM offered_item WHERE user_id=? AND visible=TRUE", [userId], function (err, result) {
                callback(err, result)
            });
        });
    },

    setOfferedItemVisible: function(offeredItemId, visible, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if(err) return callback(err);
            connection.query("UPDATE offered_item SET visible=?  WHERE id=?", [visible, offeredItemId], function (err, result) {
                callback(err, result)
            });
        });
    },

    insertOfferedItem: function(user_id, name, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if(err) return callback(err);
            connection.query("INSERT INTO offered_item(user_id, name) VALUES(?, ?)", [user_id, name], function (err, result) {
                callback(err, result)
            });
        });
    },

    deleteOfferedItem: function(offeredItemId, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if(err) return callback(err);
            connection.query("DELETE FROM offered_item WHERE id=?", [offeredItemId], function (err, result) {
                callback(err, result)
            });
        });
    },

    getOffersByToUserId: function(toUserId, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if(err) return callback(err);
            connection.query("SELECT offer.id, \
                                     from_user_id, \
                                     from_user.name as from_user_name, \
                                     from_user.phone as from_user_phone, \
                                     from_user.email as from_user_email, \
                                     from_user.address as from_user_address, \
                                     \
                                     to_user_id, \
                                     to_user.name as to_user_name, \
                                     to_user.phone as to_user_phone, \
                                     to_user.email as to_user_email, \
                                     to_user.address as to_user_address, \
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
                              INNER JOIN user as from_user ON from_user.id = from_user_id \
                              INNER JOIN user as to_user ON to_user.id = to_user_id \
                              INNER JOIN offered_item as from_offered_item ON from_offered_item.id = from_user_offered_item_id \
                              INNER JOIN wanted_item as from_wanted_item ON from_wanted_item.id = from_user_wanted_item_id \
                              INNER JOIN offered_item as to_offered_item ON to_offered_item.id = to_user_offered_item_id \
                              INNER JOIN wanted_item as to_wanted_item ON to_wanted_item.id = to_user_wanted_item_id \
                              WHERE to_user_id=?", [toUserId], function (err, result) {
                callback(err, result)
            });
        });
    },

    insertOffer: function(from_user_id, to_user_id, from_user_offered_item_id, from_user_wanted_item_id, to_user_offered_item_id, to_user_wanted_item_id, start_date, end_date, callback) {
        var self = this;
        var connection = this.createConnection();
        connection.connect(function(err) {
            var callbackCount = 0;
            if(err) return callback(err);
            connection.query("INSERT INTO offer(from_user_id, to_user_id, from_user_offered_item_id, from_user_wanted_item_id, to_user_offered_item_id, to_user_wanted_item_id, start_date, end_date) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
                [from_user_id, to_user_id, from_user_offered_item_id, from_user_wanted_item_id, to_user_offered_item_id, to_user_wanted_item_id, start_date, end_date], function (err, result) {
                if(err) return callback(err);
                callbackCount++;
                if (callbackCount == 5) callback(err, result);
            });
            self.setOfferedItemVisible(from_user_offered_item_id, false, function(err, result) {
                if(err) return callback(err);
                callbackCount++;
                if (callbackCount == 5) callback(err, result);
            });
            self.setWantedItemVisible(from_user_wanted_item_id, false, function(err, result) {
                if(err) return callback(err);
                callbackCount++;
                if (callbackCount == 5) callback(err, result);
            });
            self.setOfferedItemVisible(to_user_offered_item_id, false, function(err, result) {
                if(err) return callback(err);
                callbackCount++;
                if (callbackCount == 5) callback(err, result);
            });
            self.setWantedItemVisible(to_user_wanted_item_id, false, function(err, result) {
                if(err) return callback(err);
                callbackCount++;
                if (callbackCount == 5) callback(err, result);
            });
        });
    },

    acceptOffer: function(offerId, callback) {
        var self = this;
        var connection = this.createConnection();
        connection.connect(function(err) {
            if(err) return callback(err);
            connection.query("SELECT * FROM offer WHERE id=?", [offerId], function (err, result) {
                var callbackCount = 0;
                if(err) return callback(err);
                var offer = result[0];

                connection.query("DELETE FROM offer WHERE id=?", [offerId], function(err, result) {
                    if(err) return callback(err);
                    callbackCount++;
                    if (callbackCount == 2) callback(err, result);
                });

                self.insertSwap(offer.from_user_id, offer.to_user_id, offer.from_user_offered_item_id, offer.from_user_wanted_item_id,
                                offer.to_user_offered_item_id, offer.to_user_wanted_item_id, offer.start_date, offer.end_date, function(err, result) {
                    if(err) return callback(err);
                    callbackCount++;
                    if (callbackCount == 2) callback(err, result);
                });
            });
        });
    },

    denyOffer: function(offerId, callback) {
        var self = this;
        var connection = this.createConnection();
        connection.connect(function(err) {
            if(err) return callback(err);

            connection.query("SELECT * FROM offer WHERE id=?", [offerId], function (err, result) {
                var callbackCount = 0;
                if(err) return callback(err);
                var offer = result[0];

                connection.query("DELETE FROM offer WHERE id=?", [offerId], function(err, result) {
                    if(err) return callback(err);
                    callbackCount++;
                    if (callbackCount == 5) callback(err, result);
                });

                self.setOfferedItemVisible(offer.from_user_offered_item_id, true, function(err, result) {
                    if(err) return callback(err);
                    callbackCount++;
                    if (callbackCount == 5) callback(err, result);
                });
                self.setWantedItemVisible(offer.from_user_wanted_item_id, true, function(err, result) {
                    if(err) return callback(err);
                    callbackCount++;
                    if (callbackCount == 5) callback(err, result);
                });
                self.setOfferedItemVisible(offer.to_user_offered_item_id, true, function(err, result) {
                    if(err) return callback(err);
                    callbackCount++;
                    if (callbackCount == 5) callback(err, result);
                });
                self.setWantedItemVisible(offer.to_user_wanted_item_id, true, function(result) {
                    if(err) return callback(err);
                    callbackCount++;
                    if (callbackCount == 5) callback(err, result);
                });
            });
        });
    },

    insertSwap: function(from_user_id, to_user_id, from_user_offered_item_id, from_user_wanted_item_id, to_user_offered_item_id, to_user_wanted_item_id, start_date, end_date, callback) {
        var connection = this.createConnection();
        connection.connect(function(err) {
            if(err) return callback(err);

            connection.query("INSERT INTO swap(from_user_id, to_user_id, from_user_offered_item_id, from_user_wanted_item_id, to_user_offered_item_id, to_user_wanted_item_id, start_date, end_date) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
                [from_user_id, to_user_id, from_user_offered_item_id, from_user_wanted_item_id, to_user_offered_item_id, to_user_wanted_item_id, start_date, end_date], function (err, result) {
                    if(err) return callback(err);
                    callback(err, result);
                });
        });
    },

    deleteSwap: function(swapId, callback) {
        var self = this;
        var connection = this.createConnection();
        connection.connect(function(err) {
            if(err) return callback(err);

            connection.query("SELECT * FROM swap WHERE id=?", [swapId], function (err, result) {
                if(err) return callback(err);
                var offer = result[0];
                
                connection.query("DELETE FROM swap WHERE id=?", [swapId], function(err, result) {
                    var callbackCount = 0;
                    if(err) return callback(err);
                    
                    self.setOfferedItemVisible(offer.from_user_offered_item_id, true, function(err, result) {
                        if(err) return callback(err);
                        callbackCount++;
                        if (callbackCount == 4) callback(err, result);
                    });
                    self.deleteWantedItem(offer.from_user_wanted_item_id, function(err, result) {
                        if(err) return callback(err);
                        callbackCount++;
                        if (callbackCount == 4) callback(err, result);
                    });
                    self.setOfferedItemVisible(offer.to_user_offered_item_id, true, function(err, result) {
                        if(err) return callback(err);
                        callbackCount++;
                        if (callbackCount == 4) callback(err, result);
                    });
                    self.deleteWantedItem(offer.to_user_wanted_item_id, function(err, result) {
                        if(err) return callback(err);
                        callbackCount++;
                        if (callbackCount == 4) callback(err, result);
                    });
                
                });
            });
        });
    },

    getSwapsByUserId: function(userId, callback) {
        var connection = this.createConnection();
        connection.connect(function (err) {
            if(err) return callback(err);

            connection.query("SELECT swap.id, \
                                     from_user_id, \
                                     from_user.name as from_user_name, \
                                     from_user.phone as from_user_phone, \
                                     from_user.email as from_user_email, \
                                     from_user.address as from_user_address,\
                                     \
                                     to_user_id, \
                                     to_user.name as to_user_name, \
                                     to_user.phone as to_user_phone,\
                                     to_user.email as to_user_email, \
                                     to_user.address as to_user_address, \
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
                              INNER JOIN user as from_user ON from_user.id = from_user_id \
                              INNER JOIN user as to_user ON to_user.id = to_user_id \
                              INNER JOIN offered_item as from_offered_item ON from_offered_item.id = from_user_offered_item_id \
                              INNER JOIN wanted_item as from_wanted_item ON from_wanted_item.id = from_user_wanted_item_id \
                              INNER JOIN offered_item as to_offered_item ON to_offered_item.id = to_user_offered_item_id \
                              INNER JOIN wanted_item as to_wanted_item ON to_wanted_item.id = to_user_wanted_item_id \
                              WHERE to_user_id=? or from_user_id=?", [userId, userId], function (err, result) {                                
                callback(err, result)
            })
        });
    },

    getMatchsByFromUserIdAndToUserId: function(fromUserId, toUserId, callback) {
        var self = this;
        var connection = this.createConnection();
        self.findUserById(fromUserId, function(err, fromUser) {
            if (err) return callback(err);

            self.findUserById(toUserId, function (err, toUser) {
                if (err) return callback(err);
                self.findVisibleOfferedItemsByUserId(fromUserId, function (err, fromOfferedItems) {
                    if (err) return callback(err);

                    self.findVisibleWantedItemsByUserId(fromUserId, function (err, fromWantedItems) {
                        if (err) return callback(err);

                        self.findVisibleOfferedItemsByUserId(toUserId, function (err, toOfferedItems) {
                            if (err) return callback(err);

                            self.findVisibleWantedItemsByUserId(toUserId, function (err, toWantedItems) {
                                if (err) return callback(err);

                                var fromOfferedItemsMatches = [];
                                var fromWantedItemsMatches = [];

                                for (var i = 0; i < fromOfferedItems.length; i++) {
                                    for (var j = 0; j < toWantedItems.length; j++) {
                                        if (fromOfferedItems[i].name === toWantedItems[j].name) {
                                            fromOfferedItemsMatches.push({
                                                from_item_id: fromOfferedItems[i].id,
                                                from_item_name: fromOfferedItems[i].name,
                                                to_item_id: toWantedItems[j].id,
                                                to_item_name: toWantedItems[j].name
                                            })
                                        }
                                    }
                                }

                                for (var i = 0; i < fromWantedItems.length; i++) {
                                    for (var j = 0; j < toOfferedItems.length; j++) {
                                        if (fromWantedItems[i].name === toOfferedItems[j].name) {
                                            fromWantedItemsMatches.push({
                                                from_item_id: fromWantedItems[i].id,
                                                from_item_name: fromWantedItems[i].name,
                                                to_item_id: toOfferedItems[j].id,
                                                to_item_name: toOfferedItems[j].name
                                            })
                                        }
                                    }
                                }

                                callback(err, {
                                    fromUserId: fromUserId,
                                    fromUserName: fromUser[0].name,
                                    fromUserEmail: fromUser[0].email,
                                    fromUserAddress: fromUser[0].address,
                                    fromUserPhone: fromUser[0].phone,
                                    toUserId: toUserId,
                                    toUserName: toUser[0].name,
                                    toUserEmail: toUser[0].email,
                                    toUserAddress: toUser[0].address,
                                    toUserPhone: toUser[0].phone,
                                    fromOfferedItemsMatches: fromOfferedItemsMatches,
                                    fromWantedItemsMatches: fromWantedItemsMatches
                                })
                            });
                        });
                    });
                });
            });
        });
    },

    getMatchUsersByUserId: function(userId, callback) {
        var self = this;
        var connection = this.createConnection();
        connection.connect(function(err) {
            if(err) return callback(err);
            connection.query("SELECT * FROM user", function (err, users) {
                var matchsCount = 0;
                var matchs = [];

                for(var i = 0; i < users.length; i++) {
                    if (users[i].id !== userId) {
                        self.getMatchByFromUserIdAndToUserId(userId, users[i].id, function(err, match) {
                            matchsCount++;
                            if(err) return callback(err);
                            if (match.fromOfferedItemsMatches.length > 0 && match.fromWantedItemsMatches.length > 0)
                                matchs.push(match);
                            if(matchsCount === users.length - 1) callback(err, matchs);
                        });
                    }
                }
            });
        });
    }
};

module.exports = api;

api.getSwapsByUserId(3, function(err, result) {
    console.log(err)
});