const express = require('express');
const mongoose = require('mongoose');
const app = express();
const keys = require('./config/keys');
const passport = require('passport');
const cookieSessions = require('cookie-session');
const PORT = process.env.PORT || 3000;
require('./models/users');
require('./services/passport')
/*
mongoose.connect(,()=>{
    console.log('Yeah connected')
})*/
mongoose.connect(keys.mongoURI,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true 
}).then(con => {
    console.log("Yeah connected!!");
})

app.use(
    cookieSessions({
        maxAge: 30*24*60*60*100,
        keys:[keys.cookieKey]
    })
)
const User2 = mongoose.model('User2',{ 
    name: { type: String }, 
    age: { type: Number } 
}); 
  
var new_user = new User2({ 
    name: 'Manish', 
    age:34 
}) 
  
new_user.save(function(err,result){ 
    if (err){ 
        console.log(err); 
    } 
    else{ 
        console.log(result) 
    } 
})
app.use(passport.initialize())
app.use(passport.session());
require('./routes/authRoute')(app)


app.listen(PORT, () => {
    console.log('Server is listening port '+PORT);
})