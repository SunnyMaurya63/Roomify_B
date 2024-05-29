const express = require('express')
const router = express.Router()
const Room = require("../model/room")
const User = require("../model/user")
router.post('/roomData',async (req,res)=>{
    try {
        res.send(global.roomData)
    } catch (error) {
        console.error(error);
        console.log("Error in sending room data")
    }
})

router.post('/selectRoom', async (req,res)=>{
    try {
        let useremail = req.body.email;
        const newData = {
            room: req.body.num
        }
        await User.updateOne({email:useremail},newData)
        
        const roomData = useremail;
        await Room.updateOne({num:req.body.num},{$push:{room_data:roomData}});
        
        res.json({ success: true });
    } catch (error) {
        console.log("Error in selecting room")
        res.json({ success: false });
    }
})

router.post("/referRoom", async (req,res)=>{
    try {
        let useremail=req.body.email;
        let refroom=req.body.refroom;
        await User.updateOne({email:useremail},{ref_room:refroom})        
        res.json({success: true})
    } catch (error) {
        console.log(error)
        res.json({success: false})
    }
})

router.get("/refRoom", async (req, res) => {
    try {
        const userEmail = req.query.email; // Use req.query to get parameters from the URL
        const user = await User.findOne({ email: userEmail });

        if (user) {
            res.json({ ref: user.ref_room, success: true });
        } else {
            res.status(404).json({ error: 'User Not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});

router.get('/countRooms', async (req, res) => {
    try {
        // Query MongoDB to find rooms where room_data array size is less than 5
        const rooms = await Room.find({
            $expr: { $lt: [{ $size: '$room_data' }, 5] }
        });

        // Sort the rooms based on the num property
        rooms.sort((a, b) => a.num - b.num);

        const resultArray = rooms.map(room => ({
            num: room.num,
            sizeDifference: 5 - room.room_data.length
        }));

        res.json({ count: rooms.length, rooms: resultArray });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;