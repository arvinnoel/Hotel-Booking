const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./database/connection.js');
const path = require('path');

const app = express();

/* DATABASE */
connectDB();

/* MIDDLEWARE */
app.use(cors());
app.use(bodyParser.json());

/* STATIC FILES */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* API ROUTES — MUST START WITH /api */
app.use('/api/hotels', require('./routes/HotelRoutes'));
app.use('/api/bookings', require('./routes/BookingRoutes'));
app.use('/api/admin', require('./routes/AdminRoutes'));

/* API HEALTH CHECK */
app.get('/api', (req, res) => {
    res.json({ status: 'API working' });
});

/* SERVER */
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
