import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CarDetails from './pages/CarDetails'
import ScrollToTop from './components/ScrollToTop'
import Cars from './pages/Cars'
import MyBookings from './pages/MyBookings'
import OwnerLayout from './layouts/OwnerLayout'
import Dashboard from './pages/owner/Dashboard'
import AddCar from './pages/owner/AddCar'
import ManageCars from './pages/owner/ManageCars'
import ManageBookings from './pages/owner/ManageBookings'

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Navigate to="/Home" replace />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/cars' element={<Cars />} />
        <Route path='/MyBookings' element={<MyBookings />} />
        <Route path='/cars/:id' element={<CarDetails />} />
        <Route path="/owner" element={<OwnerLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
