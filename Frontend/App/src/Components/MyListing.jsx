import React from "react"
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { SiReactivex } from "react-icons/si";
import { AiOutlineRise } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { PiHandWithdraw } from "react-icons/pi";
import { CgUnavailable } from "react-icons/cg";
import { FaTiktok } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const MyListing = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="p-20 flex flex-row items-center justify-between ">
                <div className="ml-20 flex  flex-col" >
                    <h1 className="text-3xl font-bold">My Listings</h1>
                    <h4 className="text-md font-semibold">Manage your social media account listings</h4>
                </div>
                <div onClick={() => navigate("/addlisting")} className="flex flex-row items-center justify-center gap-2 text-white rounded bg-blue-500 h-10 w-40">
                    <FaPlus />
                    <button className="text-md font-semibold cursor-pointer  ">Add Listing</button>
                </div>

            </div>

            <div className="flex flex-row gap-7 ">
                <div className="border border-gray-200 rounded h-30 w-60 ml-40 p-4 flex flex-row items-center justify-between">
                    <div >
                        <h2 className="text-lg font-semibold">Total Listing</h2>
                        <h1 className="text-lg font-bold">10</h1>

                    </div>
                    <div className="bg-blue-300 flex items-center justify-center h-15 w-15 rounded-full">
                        <FaRegEye className="text-2xl text-blue-800" />
                    </div>
                </div>
                <div className="border border-gray-200 rounded h-30 w-60  p-4 flex flex-row items-center justify-between">
                    <div >
                        <h2 className="text-lg font-semibold">Active Listing</h2>
                        <h1 className="text-lg font-bold">10</h1>

                    </div>
                    <div className="bg-green-200 flex items-center justify-center h-15 w-15 rounded-full">
                        <SiReactivex className="text-2xl text-blue-800" />
                    </div>
                </div>
                <div className="border border-gray-200 rounded h-30 w-60  p-4 flex flex-row items-center justify-between">
                    <div >
                        <h2 className="text-lg font-semibold">Sold</h2>
                        <h1 className="text-lg font-bold">10</h1>

                    </div>
                    <div className="bg-purple-300 flex items-center justify-center h-15 w-15 rounded-full">
                        <AiOutlineRise className="text-2xl text-blue-800" />
                    </div>
                </div>
                <div className="border border-gray-200 rounded h-30 w-60  p-4 flex flex-row items-center justify-between">
                    <div >
                        <h2 className="text-lg font-semibold">Total Value</h2>
                        <h1 className="text-lg font-bold">1000</h1>

                    </div>
                    <div className="bg-yellow-200 shadow-blue-50 flex items-center justify-center h-15 w-15 rounded-full">
                        <BsCurrencyDollar className="text-2xl text-blue-800" />
                    </div>
                </div>
            </div>

            <div className="border border-gray-200 flex flex-row items-center  h-35 mt-7 w-260 ml-40">
                <div className="bg-white border cursor-pointer border-gray-200 rounded flex flex-row items-center justify-between p-4 h-15 w-70 ml-10">
                    <div className="flex felx-row gap-2 items-center justify-center">
                        <MdOutlineAccountBalanceWallet className="text-2xl" />
                        <h1 className="text-lg font-semibold">Earned</h1>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">$0.00</h2>
                    </div>
                </div>

                <div className="bg-white border cursor-pointer border-gray-200 rounded flex flex-row items-center justify-between p-4 h-15 w-70 ml-10">
                    <div className="flex felx-row gap-2 items-center justify-center">
                        <PiHandWithdraw className="text-2xl" />
                        <h1 className="text-lg font-semibold">Withdrawn</h1>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">$0.00</h2>
                    </div>
                </div>

                <div className="bg-white border cursor-pointer border-gray-200 rounded flex flex-row items-center justify-between p-4 h-15 w-70 ml-10">
                    <div className="flex felx-row gap-2 items-center justify-center">
                        <CgUnavailable className="text-2xl" />
                        <h1 className="text-lg font-semibold">Avaliable</h1>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">$0.00</h2>
                    </div>
                </div>
            </div>

            <div className="bg-white border p-6  border-gray-200 h-70 rounded-xl  w-100 mt-5 ml-40">
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
                    <div className="flex flex-row gap-2">
                        <FaUnlockKeyhole className="text-2xl text-gray-300" />
                        <FaRegStar className="text-2xl text-yellow-500" />
                    </div>
                </div>

                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row gap-2 mt-3 items-center">
                        <GoPerson className="text-2xl font-bold" />
                        <h4 className="font-bold">10000</h4>
                        <p className="text-sm font-semibold">Followers</p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <RiVerifiedBadgeLine className="text-2xl text-green-500" />
                        <h4 className="text-green-500">active</h4>
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-semibold mt-4 h-10 border-b-1">4 % Engagment</h4>
                </div>

                <div className="mt-4 flex flex-row justify-between items-center" >
                    <div className="flex flex-row gap-2 items-center">
                        <h1 className="text-2xl font-bold">$1000</h1>
                        <p className="">usd</p>
                    </div>
                    <div className="px-6 flex flex-row gap-2 items-center ">
                        <div className="border border-gray-200 flex cursor-pointer items-center rounded-xl justify-center h-9 w-12">
                            <IoTrashOutline className="text-xl" />
                        </div>
                        <div className="border border-gray-200 flex cursor-pointer items-center rounded-xl justify-center h-9 w-12">
                            <FaRegEdit className="text-xl" />
                        </div>
                        <div className="border border-gray-200 flex cursor-pointer items-center rounded-xl justify-center h-9 w-12">
                            <FaEyeSlash className="text-xl" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default MyListing