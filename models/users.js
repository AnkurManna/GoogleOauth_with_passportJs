const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    /*name:{
        type:String,
        required:[true,'one user must have a name']
    },*/
    googleId:String
})

mongoose.model("User",userSchema);