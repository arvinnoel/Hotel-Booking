const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  const { hotelName, startDate, endDate, customerName } = req.body;

  try {
    const newBooking = new Booking({
      hotelName,
      startDate,
      endDate,
      customerName,
    });

    const booking = await newBooking.save();

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

  exports.getAllBookings = async (req, res) => {
    try {
        const booking = await allbookings.find({});
        res.status(200).json({ data: booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
};
