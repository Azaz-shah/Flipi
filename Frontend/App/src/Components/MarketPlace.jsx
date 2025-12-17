import React, { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { IoChevronDown } from "react-icons/io5";
import { FaTiktok } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { GoPerson } from "react-icons/go";
const marketplace = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [rangeDropDown, setRangeDropDown] = useState(false);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [niche, setNiche] = useState([]);
    const [rangeValue, setRangeValue] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [followers, setFollowers] = useState('');
    const [status, setStatus] = useState('');

    const platforms = ['Instagram', 'Youtube', 'Twitter', 'Telegram'];
    const niches = ['food', 'lifestyle', 'entertainment', 'health', 'beauty', 'finance', 'education', 'gaming', 'sports'];
    const followersCount = ['1000', '10000', '100000', '1000000', '10000000'];
    const statusCount = ["Verfied Account Only", "Monitized Account Only", "Verified & Monitized Account Only"];

    const moveToHome = () => {
        window.location.href = "/"
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const toggleRangeDropdown = () => {
        setRangeDropDown(!rangeDropDown);
    }

    const handlePlatformChange = (platform) => {
        setSelectedPlatforms(prev =>
            prev.includes(platform)
                ? prev.filter(p => p !== platform)
                : [...prev, platform]
        );
    }

    const handleRangeChange = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setRangeValue(percentage);
    }

    const handleMouseDown = () => {
        setIsDragging(true);
    }

    const toggleNicheDropdown = () => {
        setDropDown(!dropDown)
    }

    const handleMouseUp = () => {
        setIsDragging(false);
    }

    const handleMouseMove = (e) => {
        if (isDragging) {
            handleRangeChange(e);
        }
    }

    const statusChange = () => {
        setStatus(!status)
    }

    const followerChange = () => {
        setFollowers(!followers)
    }
    return (
        <div className="marketplace">
            <div className="p-10 flex flex-row items-center gap-4 cursor-pointer" onClick={moveToHome}>
                <FaLongArrowAltLeft />
                <h1>Back to Home</h1>
            </div>

            <div className="flex flex-row gap-4">
                <div className="h-100 w-70  border border-gray-300 rounded-xl ml-10 mt-5 ">
                    <div className="h-15 w-full flex flex-row justify-between items-center p-4 border border-gray-300 bg-white">
                        <div className="flex flex-row gap-2 text-xl items-center p-4">
                            <CiFilter className="text-2xl" />
                            <h4 className="text-md font-semibold">Filters</h4>
                        </div>
                        <div>
                            <RxCross2 className="text-2xl cursor-pointer" />
                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <input className="border border-gray-300 h-10 w-60 rounded text-sm p-3 " type="text" placeholder="Search by username ,plateform" />
                    </div>

                    <div className="mt-3 p-4">
                        <div className="relative">
                            <div
                                className="flex items-center justify-between cursor-pointer "
                                onClick={toggleDropdown}
                            >
                                <h4 className="font-semibold">Platform</h4>
                                <IoChevronDown className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </div>

                            {isDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                    {platforms.map((platform) => (
                                        <label key={platform} className="flex items-center p-3 hover:bg-gray-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedPlatforms.includes(platform)}
                                                onChange={() => handlePlatformChange(platform)}
                                                className="mr-3 w-4 h-4 text-purple-600 border-gray-300 rounded"
                                            />
                                            <span className="text-sm">{platform}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="relative mt-4">
                            <div
                                className="flex items-center justify-between cursor-pointer "
                                onClick={toggleRangeDropdown}
                            >
                                <h4 className="font-semibold">Range</h4>
                                <IoChevronDown className={`transition-transform duration-200 ${rangeDropDown ? 'rotate-180' : ''}`} />
                            </div>

                            {rangeDropDown && (
                                <div className="mt-4 p-2">

                                    <div
                                        className="relative h-2 w-60 rounded-full bg-gray-300 cursor-pointer"
                                        onClick={handleRangeChange}
                                        onMouseMove={handleMouseMove}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseUp}
                                    >
                                        {/* Progress bar */}
                                        <div
                                            className="absolute h-2 rounded-full bg-purple-600"
                                            style={{ width: `${rangeValue}%` }}
                                        ></div>

                                        {/* Draggable circle */}
                                        <div
                                            className="absolute h-4 w-4 -mt-1 rounded-full bg-purple-600 cursor-grab active:cursor-grabbing shadow-md hover:scale-110 transition-transform"
                                            style={{ left: `calc(${rangeValue}% - 8px)` }}
                                            onMouseDown={handleMouseDown}
                                        ></div>
                                        <div className="flex items-center text-md font-bold justify-between text-xs text-gray-500 ">
                                            <span className="mt-3">$0</span>
                                            <span className="mt-3">$100000</span>
                                        </div>
                                    </div>
                                    {/* <div className="text-center text-sm text-gray-600 mt-2">
                                        Value: {Math.round(rangeValue)}
                                    </div> */}
                                </div>
                            )}
                        </div>

                        <div className="relative mt-4">
                            <div
                                className="flex items-center justify-between cursor-pointer "
                                onClick={toggleNicheDropdown}
                            >
                                <h4 className="font-semibold">Niche</h4>
                                <IoChevronDown className={`transition-transform duration-200 ${dropDown ? 'rotate-180' : ''}`} />
                            </div>

                            {dropDown && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                    {niches.map((niche) => (
                                        <label key={niche} className="flex items-center p-3 hover:bg-gray-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedPlatforms.includes(niche)}
                                                onChange={() => handlePlatformChange(niche)}
                                                className="mr-3 w-4 h-4 text-purple-600 border-gray-300 rounded"
                                            />
                                            <span className="text-sm">{niche}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="relative mt-4">
                            <div
                                className="flex items-center justify-between cursor-pointer "
                                onClick={followerChange}
                            >
                                <h4 className="font-semibold">Minimum Followers</h4>
                                <IoChevronDown className={`transition-transform duration-200 ${followers ? 'rotate-180' : ''}`} />
                            </div>

                            {followers && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                    {followersCount.map((platform) => (
                                        <label key={platform} className="flex items-center p-3 hover:bg-gray-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedPlatforms.includes(platform)}
                                                onChange={() => handlePlatformChange(platform)}
                                                className="mr-3 w-4 h-4 text-purple-600 border-gray-300 rounded"
                                            />
                                            <span className="text-sm">{platform}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="relative mt-4">
                            <div
                                className="flex items-center justify-between cursor-pointer "
                                onClick={statusChange}
                            >
                                <h4 className="font-semibold">Account Status</h4>
                                <IoChevronDown className={`transition-transform duration-200 ${status ? 'rotate-180' : ''}`} />
                            </div>

                            {status && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                    {statusCount.map((platform) => (
                                        <label key={platform} className="flex items-center p-3 hover:bg-gray-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedPlatforms.includes(platform)}
                                                onChange={() => handlePlatformChange(platform)}
                                                className="mr-3 w-4 h-4 text-purple-600 border-gray-300 rounded"
                                            />
                                            <span className="text-sm">{platform}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div>

                    <div className="flex flex-row items-center gap-6 ">
                        <div className="bg-white  p-6  border border-gray-300 h-70 rounded-xl  w-100 mt-5">
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row items-center gap-2">
                                    <button className="bg-gray-200 flex items-center justify-center h-10 w-10">
                                        <FaTiktok />
                                    </button>
                                    <div className="flex flex-col ">
                                        <h2 className="text-md font-bold">Tiktok</h2>
                                        <h1>@azaz - TikTok</h1>
                                    </div>
                                </div>
                                <div>
                                    <MdVerified className="text-3xl text-green-600" />
                                </div>
                            </div>

                            <div className="flex flex-row items-center justify-between">
                                <div className="flex flex-row gap-2 mt-3 items-center">
                                    <GoPerson className="text-2xl font-bold" />
                                    <h4 className="font-bold">10000</h4>
                                    <p className="text-sm font-semibold">Followers</p>
                                </div>
                                <div>
                                    <h2>4 % Engagment</h2>
                                </div>
                            </div>

                            <div>
                                <button className="bg-pink-400 h-7 w-18 font-semibold mt-5 text-sm rounded-2xl">Lifestyle</button>

                                <h4 className="text-sm font-semibold mt-4 h-10 border-b-1">This is my first project to be build</h4>

                            </div>

                            <div className="mt-4 flex flex-row justify-between items-center" >
                                <div className="flex flex-row gap-2 items-center">
                                    <h1 className="text-2xl font-bold">$1000</h1>
                                    <p className="">usd</p>
                                </div>
                                <div className="px-6">
                                    <button className="bg-purple-500 cursor-pointer h-10 w-30 text-white rounded text-sm font-semibold">View Details</button>
                                </div>
                            </div>

                        </div>
                        <div className="bg-white  p-6  border border-gray-300 h-70 rounded-xl  w-100 mt-5">
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row items-center gap-2">
                                    <button className="bg-gray-200 flex items-center justify-center h-10 w-10">
                                        <FaTiktok />
                                    </button>
                                    <div className="flex flex-col ">
                                        <h2 className="text-md font-bold">Tiktok</h2>
                                        <h1>@azaz - TikTok</h1>
                                    </div>
                                </div>
                                <div>
                                    <MdVerified className="text-3xl text-green-600" />
                                </div>
                            </div>

                            <div className="flex flex-row items-center justify-between">
                                <div className="flex flex-row gap-2 mt-3 items-center">
                                    <GoPerson className="text-2xl font-bold" />
                                    <h4 className="font-bold">10000</h4>
                                    <p className="text-sm font-semibold">Followers</p>
                                </div>
                                <div>
                                    <h2>4 % Engagment</h2>
                                </div>
                            </div>

                            <div>
                                <button className="bg-pink-400 h-7 w-18 font-semibold mt-5 text-sm rounded-2xl">Lifestyle</button>

                                <h4 className="text-sm font-semibold mt-4 h-10 border-b-1">This is my first project to be build</h4>

                            </div>

                            <div className="mt-4 flex flex-row justify-between items-center" >
                                <div className="flex flex-row gap-2 items-center">
                                    <h1 className="text-2xl font-bold">$1000</h1>
                                    <p className="">usd</p>
                                </div>
                                <div className="px-6">
                                    <button className="bg-purple-500 cursor-pointer h-10 w-30 text-white rounded text-sm font-semibold">View Details</button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-6 ">
                        <div className="bg-white border border-gray-300 p-6   h-70 rounded-xl  w-100 mt-5">
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row items-center gap-2">
                                    <button className="bg-gray-200 flex items-center justify-center h-10 w-10">
                                        <FaTiktok />
                                    </button>
                                    <div className="flex flex-col ">
                                        <h2 className="text-md font-bold">Tiktok</h2>
                                        <h1>@azaz - TikTok</h1>
                                    </div>
                                </div>
                                <div>
                                    <MdVerified className="text-3xl text-green-600" />
                                </div>
                            </div>

                            <div className="flex flex-row items-center justify-between">
                                <div className="flex flex-row gap-2 mt-3 items-center">
                                    <GoPerson className="text-2xl font-bold" />
                                    <h4 className="font-bold">10000</h4>
                                    <p className="text-sm font-semibold">Followers</p>
                                </div>
                                <div>
                                    <h2>4 % Engagment</h2>
                                </div>
                            </div>

                            <div>
                                <button className="bg-pink-400 h-7 w-18 font-semibold mt-5 text-sm rounded-2xl">Lifestyle</button>

                                <h4 className="text-sm font-semibold mt-4 h-10 border-b-1">This is my first project to be build</h4>

                            </div>

                            <div className="mt-4 flex flex-row justify-between items-center" >
                                <div className="flex flex-row gap-2 items-center">
                                    <h1 className="text-2xl font-bold">$1000</h1>
                                    <p className="">usd</p>
                                </div>
                                <div className="px-6">
                                    <button className="bg-purple-500 cursor-pointer h-10 w-30 text-white rounded text-sm font-semibold">View Details</button>
                                </div>
                            </div>

                        </div>
                        <div className="bg-white border border-gray-300 p-6   h-70 rounded-xl  w-100 mt-5">
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row items-center gap-2">
                                    <button className="bg-gray-100 flex items-center justify-center h-10 w-10">
                                        <FaTiktok />
                                    </button>
                                    <div className="flex flex-col ">
                                        <h2 className="text-md font-bold">Tiktok</h2>
                                        <h1>@azaz - TikTok</h1>
                                    </div>
                                </div>
                                <div>
                                    <MdVerified className="text-3xl text-green-600" />
                                </div>
                            </div>

                            <div className="flex flex-row items-center justify-between">
                                <div className="flex flex-row gap-2 mt-3 items-center">
                                    <GoPerson className="text-2xl font-bold" />
                                    <h4 className="font-bold">10000</h4>
                                    <p className="text-sm font-semibold">Followers</p>
                                </div>
                                <div>
                                    <h2>4 % Engagment</h2>
                                </div>
                            </div>

                            <div>
                                <button className="bg-pink-400 h-7 w-18 font-semibold mt-5 text-sm rounded-2xl">Lifestyle</button>

                                <h4 className="text-sm font-semibold mt-4 h-10 border-b-1">This is my first project to be build</h4>

                            </div>

                            <div className="mt-4 flex flex-row justify-between items-center" >
                                <div className="flex flex-row gap-2 items-center">
                                    <h1 className="text-2xl font-bold">$1000</h1>
                                    <p className="">usd</p>
                                </div>
                                <div className="px-6">
                                    <button className="bg-purple-500 cursor-pointer h-10 w-30 text-white rounded text-sm font-semibold">View Details</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default marketplace;