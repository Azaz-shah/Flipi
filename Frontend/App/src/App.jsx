import React from 'react'
import "./index.css"
import { Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar'
import Home from './Components/Home';
import MarketPlace from "./Components/MarketPlace"
const App = () => {
  return (
    <div className='h-screen w-full bg-white text-black'>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<MarketPlace />} />
      </Routes>

    </div>
  )
}

export default App