const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();

const PORT = process.env.PORT || 3000;
const keys = require('./config/keys');
passport.use(
    new GoogleStrategy({
        clientID:keys.googleClientId,
        clientSecret:keys.googleClientSecret,
        callbackURL:"https://localhost:3000/auth/google/callback"
    },
    (accessToken,refreshToken,profile,done) =>{
        console.log("accessToken",accessToken);
        console.log("refreshToken",refreshToken);
        console.log("profile",profile);
    }
    )

)

app.get('/auth/google', passport.authenticate('google',{
    scope:['profile', 'email']
}));

app.get("/auth/google/callback", passport.authenticate('google'))


app.listen(PORT, () => {
    console.log('Server is listening port '+PORT);
})