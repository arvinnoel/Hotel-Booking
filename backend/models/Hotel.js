const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  hotelName: {
    type: String,
    required: true,
    unique: true,
  },
  hotelImage: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Hotel', HotelSchema);
