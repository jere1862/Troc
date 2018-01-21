var LocalStrategy = require('passport-local').Strategy;
var database = require('../db/db');

module.exports = function(passport) {

    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        database.findUserAndPasswordById(id, function(err, rows){
            done(null, rows[0]);
        });
    });
    
    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            database.findUserAndPasswordByEmail(email, function(err, rows){
                if(err && err.length) return done(err);
                if(rows && rows.length){
                    console.log("User already exists");
                    return done(null, false, {message: 'That email is already in use.'});
                }else{
                    console.log("Creating user " + req.body.name);
                    database.insertUser(req.body.name, email, req.body.phone, req.body.address, password, function(err, result) {
                        if(err && err.length) return done(err);
                        var user = {
                            id: result.id,
                            name: req.body.name,
                            email: email,
                            phone: req.body.phone,
                            address: req.body.address,
                            password: password
                        };

                        return done(null, user);
                    });
                }
            })
        }
    ));

    passport.use('local-login', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done){
            database.findUserAndPasswordByEmail(email, function(err, rows){
                if(err && err.length) return done(err);
                if(!rows.length){
                    return done(null, false, {message: 'No user found'});
                }

                if(rows[0].password !== password){
                    return done(null, false, {message: 'Oops! Wrong password'});
                }

                return done(null, rows[0]);
            });
        }
    ));
}