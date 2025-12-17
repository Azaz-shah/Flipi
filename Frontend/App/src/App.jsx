import React from 'react'
import "./index.css"
import { Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar'
import Home from './Components/Home';
import MarketPlace from "./Components/MarketPlace"
import MyListing from "./Components/MyListing"
import AddListing from './Components/AddListing';
import Messages from "./Components/Messages"
const App = () => {
  return (
    <div className='h-screen w-full bg-white text-black'>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/mylisting" element={<MyListing />} />
        <Route path="/listings" element={<MyListing />} />
        <Route path="/addlisting" element={<AddListing />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>


    </div>
  )
}

export default App