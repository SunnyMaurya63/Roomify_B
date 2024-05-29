const mongoose = require('mongoose')
const { Schema } = mongoose;

const roomSchema = new Schema({
    num:{
        type:Number,
        required:true
    },
    room_data:{
        type:Array,
        required:true
    }
})

module.exports = mongoose.model('rooms',roomSchema)