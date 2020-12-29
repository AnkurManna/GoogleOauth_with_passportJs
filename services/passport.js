const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User1 = mongoose.model('User')

passport.serializeUser((user,done)=>{
    done(null,user.id||user.googleId);
});

passport.deserializeUser((id,done)=>{
    User1.findById(id).then((user)=>{
        done(null,user);
    }).catch(err => {
        console.log(err);
    });
});

passport.use(
    new GoogleStrategy({
        clientID:keys.googleClientId,
        clientSecret:keys.googleClientSecret,
        callbackURL:"http://localhost:3000/auth/google/callback", 
        passReqToCallback   : true
        
    },
    (req,accessToken,refreshToken,profile,done) =>{
        
        console.log("profile",profile);
        /*console.log("refreshToken",refreshToken);
        console.log("accessToken",accessToken);
        console.log("done",done);*/
        User1.findOne({googleId:profile.id}).then((existingUser)=>{

            if(existingUser) {

                done(null,existingUser) 
            }
            else
            {
            
                new User1({googleId:profile.id}).save().then((user)=>{
                    done(null,user);
            }
                )}
        })
        .catch(err=>{
            console.log(err);
        })/*
        new User({googleId:profile.id}).save().then((user)=>{
            done(null,user);
        })
        
        /*User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
          });*/
        
    }
    )

)