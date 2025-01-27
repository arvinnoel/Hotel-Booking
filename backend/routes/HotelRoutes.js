const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const {
  getAllHotels,
  addHotel,
  deleteHotel,
} = require('../controllers/HotelController');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'), 
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

router.get('/', getAllHotels);

router.post('/', upload.single('hotelImage'), addHotel);

router.delete('/:id', deleteHotel);

module.exports = router;
