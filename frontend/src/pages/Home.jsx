import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/hotels');
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  return (
    <div className="container">
      <h1>Welcome to Hotel Booking</h1>
      <br />
      <h2>Available Hotels</h2>
      <div className="hotel-list">
        {hotels.map((hotel, index) => (
          <div key={index} className="hotel-card">
            <img
              src={`http://localhost:5000/uploads/${hotel.hotelImage}`}
              alt={hotel.hotelName}
              className="hotel-image"
            />
            <div className="hotel-name">{hotel.hotelName}</div>
          </div>
        ))}
      </div>
      <br />
      <br />
      <div className="navigation">
        <a href="/BookingForm" className="nav-link">Book a Hotel</a>
      </div>
    </div>
  );
};

export default Home;
