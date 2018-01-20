var LocalStrategy = require('passport-local').Strategy;
var database = require('../db/database');

module.exports = function(passport) {

    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        database.findUserById(id, function(err, rows){
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
            database.findUserWithEmail(email, function(err, rows){
                if(err) return done(err);
                if(rows.length){
                    return done(null, false, {message: 'That email is already in use.'});
                }else{
                    var newUser = {
                        email: email,
                        password: password
                    };
                    dabatase.createUser(user, function(err, rows) {
                        newUser.id = rows.insertId;
                        return done(null, newUser);
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
            database.findUserWithEmail(email, function(err, rows){
                if(err) return done(err);
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