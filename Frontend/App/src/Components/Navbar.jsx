import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { TbTallymark4 } from "react-icons/tb";
import { LuMessageSquareMore } from "react-icons/lu";
import { IoList } from "react-icons/io5";
import { FaFirstOrder } from "react-icons/fa6";
import { AiOutlineLogin } from "react-icons/ai";

const Navbar = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }


    return (
        <div className="h-20 w-full bg-white  border-b-1 flex items-center justify-evenly" >
            <div className="text-3xl font-bold">
                <h1><span className="text-purple-700">Flip</span>earn<span className="text-4xl text-purple-700">.</span></h1>
            </div>
            <div className=" text-md font-semibold flex flex-row items-center justify-center gap-5" >
                <ul className="flex flex-row gap-8 text-gray-500 cursor-pointer" >
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li className="cursor-pointer ">
                        <Link to="/marketplace">Marketplace</Link>
                    </li>
                    <li>
                        Messages
                    </li>
                    <li>
                        <Link to="/mylisting">My Listing</Link>
                    </li>

                </ul>
                <button className="h-8 text-white font-semibold w-30 rounded-2xl bg-blue-600">Dashboard</button>


            </div>
            <div className="relative">
                <button
                    className="bg-amber-600 h-10 w-10 rounded-full font-bold cursor-pointer hover:bg-amber-700 transition-colors"
                    onClick={toggleDropdown}
                >
                    A
                </button>

                {isDropdownOpen && (
                    <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg h-95  w-80 py-2 z-50">
                        <ul className="text-sm">
                            <div className='flex flex-row items-center justify-start p-2 mt-3 gap-3 border-b-1'>
                                <div className='' >
                                    <button
                                        className="bg-amber-600 h-10 w-10 rounded-full font-bold cursor-pointer hover:bg-amber-700 transition-colors"
                                    >
                                        A
                                    </button>
                                </div>
                                <div>
                                    <h2 className='text-lg font-semibold'>Azaz Shah</h2>
                                    <h4 className='font-semibold'>azazshah987@gmail.com</h4>
                                </div>
                            </div>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer mt-3 border-b-0 flex items-center justify-start gap-5">
                                <span className='text-md  '>⚙️</span> <h2 className='text-sm font-semibold'>Manage Account</h2>
                            </li>
                            <li onClick={() => navigate("/marketplace")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer mt-3 border-b-0 flex items-center justify-start gap-5">
                                <span className='text-md  '><TbTallymark4 className='text-xl' /></span> <h2 className='text-sm font-semibold'>Marketplace</h2>
                            </li>
                            <li onClick={() => navigate("/messages")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer mt-3 border-b-0 flex items-center justify-start gap-5">
                                <span className='text-md  '><LuMessageSquareMore className='text-xl' /></span> <h2 className='text-sm font-semibold'>Messages</h2>
                            </li>

                            <li onClick={() => navigate("/mylisting")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer mt-3 border-b-0 flex items-center justify-start gap-5">
                                <span className='text-md  '><IoList className='text-xl' /></span> <h2 className='text-sm font-semibold'>My Listing</h2>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer mt-3 border-b-0 flex items-center justify-start gap-5">
                                <span className='text-md  '><FaFirstOrder className='text-xl' /></span> <h2 className='text-sm font-semibold'>My Orders</h2>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer mt-3 border-b-0 flex items-center justify-start gap-5">
                                <span className='text-md  '><AiOutlineLogin className='text-xl' /></span> <h2 className='text-sm font-semibold'>Sign out</h2>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar;