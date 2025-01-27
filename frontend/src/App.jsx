import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Admin from './pages/Admin'
import BookingForm from './pages/BookingForm'
import Home from './pages/Home'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/BookingForm" element={<BookingForm />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
    </>
  )
}

export default App
