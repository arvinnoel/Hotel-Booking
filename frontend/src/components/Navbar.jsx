import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">Hotel Management</div>
            <ul className="nav-links">
            <li><Link to = '/'>Home</Link></li>
            <li><Link to = 'BookingForm'>Booking Form</Link></li>
            <li><Link to = 'Admin'>Admin</Link></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar
