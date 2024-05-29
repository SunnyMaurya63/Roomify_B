require('dotenv').config();
const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Connected to mongoDB")
        let fetched_data = await mongoose.connection.db.collection("rooms");
        let data = fetched_data.find({}).toArray();
        global.roomData = data;

    } catch (error) {
        console.log("Error connecting to mongoDB",error)
    }

}

module.exports =  mongoDB;