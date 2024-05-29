const express = require('express')
const app = express();
const port = 5000 || process.env.PORT
const mongoDB = require("./db")
mongoDB();


const cors = require("cors");
app.use(cors())
const corsOptions ={
   origin:'*', 
   credentials:true,      
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))


app.get("/",(req,res)=>{
    res.send("Server is live and running as well as it should")
})

app.use(express.json())
app.use('/api',require("./Routes/createUser"));
app.use('/api',require("./Routes/roomData"));
app.use('/api',require("./Routes/createRoom"));


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})