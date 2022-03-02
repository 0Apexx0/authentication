const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../model/user');
const crypto = require('crypto')


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID : "722929667649-d7eu7qsap8i0ghh5016i1nilfuej2tou.apps.googleusercontent.com",
        clientSecret : "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",
        callbackURL : "http://authentication-system-1.herokuapp.com/user/auth/google/callback"
        // to use it locally uncommect the below line and comment the above line
        // callbackURL : "http://localhost:7000/user/auth/google/callback"

    },

    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err){console.log('error in google strategy-passport', err); return;}
            console.log(accessToken, refreshToken);
            console.log(profile);

            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if (err){console.log('error in creating user google strategy-passport', err); return;}

                    return done(null, user);
                });
            }

        }); 
    }
));

module.exports = passport ;