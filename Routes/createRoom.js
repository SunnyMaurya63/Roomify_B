const express = require('express');
const router = express.Router();
const Room = require('../model/room')
router.post("/createroom", async (req, res) => {
    const roomArray = []
    try {
        await Room.create({
            num: req.body.num,
            room_data: roomArray
        })
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})

module.exports = router
