const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User1 = mongoose.model('User')

passport.serializeUser((user,done)=>{
    console.log("serializeUser called",user.id)
    done(null,user.id);
});

//this thing takes info from cookie and embeds into request object in user field
passport.deserializeUser((id,done)=>{
    console.log("deserializeUser called")
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
       
        
    },
    (accessToken,refreshToken,profile,done) =>{
        
        console.log("profile",profile);
        User1.findOne({googleId:profile.id}).then((existingUser)=>{

            if(existingUser) {
                console.log("existing user",existingUser)
                //this will call serializeUser to take identification
                //info to make cookie
                done(null,existingUser) 
                
            }
            else
            {
                
                //console.log("creating user",user)
                new User1({
                    googleId:profile.id,
                    username:profile.displayName,
                    picture:profile.photos[0].value
                }).save().then((user)=>{
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