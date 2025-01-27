const express = require('express');
const router = express. Router();
const Booking = require('../models/Booking');

router.get('/bookings', async (req,res) => {
    try{
        const bookings = await Booking.find();
        res.json(bookings);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
module.exports = router;