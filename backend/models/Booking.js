const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  hotelName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Booking', BookingSchema);
