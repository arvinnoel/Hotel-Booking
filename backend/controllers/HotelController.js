const Hotel = require('../models/Hotel');
const path = require('path');
const fs = require('fs'); 

exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addHotel = async (req, res) => {
  const { hotelName } = req.body;
  const hotelImage = req.file ? req.file.filename : '';

  try {
    const newHotel = new Hotel({
      hotelName,
      hotelImage,
    });

    const hotel = await newHotel.save();
    res.json(hotel);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    console.log(`Attempting to delete hotel with id: ${req.params.id}`);
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      console.log('Hotel not found');
      return res.status(404).json({ msg: 'Hotel not found' });
    }

    if (hotel.hotelImage) {
      try {
        const imagePath = path.join(__dirname, '..', 'uploads', hotel.hotelImage);
        console.log(`Deleting image: ${imagePath}`);
        fs.unlinkSync(imagePath);
        console.log(`Image ${hotel.hotelImage} deleted successfully`);
      } catch (err) {
        if (err.code === 'ENOENT') {
          console.log(`Image ${hotel.hotelImage} not found, skipping deletion`);
        } else {
          console.error(`Error deleting image ${hotel.hotelImage}: ${err.message}`);
          return res.status(500).json({ msg: 'Error deleting image' });
        }
      }
    }

    await Hotel.deleteOne({ _id: req.params.id });
    console.log(`Hotel with id: ${req.params.id} deleted successfully`);
    res.json({ msg: 'Hotel removed' });
  } catch (err) {
    console.error('Error removing hotel:', err.message);
    res.status(500).send('Server Error');
  }
};
