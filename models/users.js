const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    /*name:{
        type:String,
        required:[true,'one user must have a name']
    },*/
    googleId:String,
    username:String,
    picture:String
})

mongoose.model("User",userSchema);