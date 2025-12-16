import React from 'react'
import "./index.css"
import { Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar'
import Home from './Components/Home';
const App = () => {
  return (
    <div className='h-screen w-full bg-white text-black'>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

    </div>
  )
}

export default App