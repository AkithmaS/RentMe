import React from 'react'
import Navbar from './components/Navbar'
import { Route,Routes,useLocation } from 'react-router-dom'
import Home from './pages/Home'

const App = () => {
  return (
    <>
    <div>
      <Navbar />
    </div>

<Routes>
  <Route path='/' element={<Home />} />
</Routes>
</>
  )
}

export default App
