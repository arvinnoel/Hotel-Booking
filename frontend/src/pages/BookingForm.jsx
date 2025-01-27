import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookingForm.css';

const BookingForm = () => {
  const [hotels, setHotels] = useState([]); 
  const [hotelName, setHotelName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/hotels')
      .then(response => setHotels(response.data || [])) 
      .catch(error => console.error('Error fetching hotels:', error));
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = { hotelName, startDate, endDate, customerName };

    axios.post('http://localhost:5000/api/bookings', bookingData)
      .then(() => {
        alert('Booking successful!');
        setHotelName('');
        setStartDate('');
        setEndDate('');
        setCustomerName('');
      })
      .catch(error => console.error('Error creating booking:', error));
  };

  const todayDate = new Date().toISOString().split('T')[0];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select value={hotelName} onChange={(e) => setHotelName(e.target.value)} required>
          <option value="" disabled>Select a hotel</option>
          {hotels.length > 0 ? (
            hotels.map((hotel, index) => (
              <option key={index} value={hotel.hotelName}>
                {hotel.hotelName}
              </option>
            ))
          ) : (
            <option disabled>Loading hotels...</option>
          )}
        </select>

        <label htmlFor="startDate">Start Date: </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          min={todayDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <label htmlFor="endDate">End Date: </label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          min={startDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <label htmlFor="customerName">Customer Name:</label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;
