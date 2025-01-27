import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const [hotelName, setHotelName] = useState('');
  const [hotelImage, setHotelImage] = useState(null);
  const [hotels, setHotels] = useState([]);
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    fetchBookings();
    fetchHotels();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/admin/bookings`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchHotels = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/hotels`);
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const handleHotelSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('hotelName', hotelName);
    formData.append('hotelImage', hotelImage);

    try {
      await axios.post(`${apiUrl}/api/hotels`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      fetchHotels();
      setHotelName('');
      setHotelImage(null);
    } catch (error) {
      console.error('Error adding hotel:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/hotels/${id}`);
      fetchHotels();
    } catch (error) {
      console.error(
        'Error deleting hotel:',
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="container">
      <h1>Booking Details</h1>
      <table>
        <thead>
          <tr>
            <th>Hotel Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Customer Name</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.hotelName}</td>
              <td>{new Date(booking.startDate).toLocaleDateString()}</td>
              <td>{new Date(booking.endDate).toLocaleDateString()}</td>
              <td>{booking.customerName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />
      <br />
      <br />

      <h1>Manage Hotels</h1>
      <form onSubmit={handleHotelSubmit}>
        <label htmlFor="hotelName">Hotel Name: </label>
        <input
          type="text"
          id="hotelName"
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
          required
        />
        <label htmlFor="hotelImage">Hotel Image: </label>
        <input
          type="file"
          id="hotelImage"
          onChange={(e) => setHotelImage(e.target.files[0])}
          required
        />
        <button type="submit">Add Hotel</button>
      </form>

      <hr />
      <br />

      <h2>Hotel List</h2>
      <ul>
        {hotels.map((hotel, index) => (
          <li key={index}>
            <div className="card">
              <img
                src={`${apiUrl}/uploads/${hotel.hotelImage}`}
                alt={hotel.hotelName}
              />
              <div className="card-content">
                <h3>{hotel.hotelName}</h3>
                <button onClick={() => handleDelete(hotel._id)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;