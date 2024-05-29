const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    room:{
        type:Number
    },
    ref_room:{
        type:Number
    }
})

module.exports = mongoose.model('users',userSchema)