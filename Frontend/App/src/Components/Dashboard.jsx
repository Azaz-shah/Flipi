import React from "react"
import { RiListIndefinite } from "react-icons/ri";
import { BiDollarCircle } from "react-icons/bi";
import { LuUsers } from "react-icons/lu";
const Dashboard = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="bg-white border-r border-gray-300 w-64 h-full">
                {/* User Profile Section */}
                <div className="flex flex-col items-center py-6 border-b border-gray-200">
                    <button className="bg-amber-900 text-white flex items-center justify-center rounded-full h-12 w-12 mb-2 font-bold">
                        A
                    </button>
                    <h4 className="text-lg font-semibold text-gray-800">Azaz Shah</h4>
                    <p className="text-sm text-gray-500">azazshah987@gmail.com</p>
                </div>

                {/* Navigation Menu */}
                <div className="py-4">
                    <ul className="space-y-2 px-10">
                        <li className="px-4 py-1 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700 font-medium">
                            📊 Dashboard
                        </li>
                        <li className="px-4 py-1  hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700 font-medium">
                            ✅ Verify
                        </li>
                        <li className="px-4 py-1  hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700 font-medium">
                            🔄 Change
                        </li>
                        <li className="px-4 py-1   hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700 font-medium">
                            📝 My Listings
                        </li>
                        <li className="px-4 py-1   hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700 font-medium">
                            💳 Transactions
                        </li>
                        <li className="px-4 py-1  hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700 font-medium">
                            💰 Withdrawals
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-gray-100 p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6"> Admin <span className="text-blue-700 "> Dashboard</span></h1>
                <div className="flex flex-row gap-5">
                    <div className="border border-gray-300 bg-white h-25 w-50 rounded flex p-2  items-center justify-between ">
                        <div className="flex flex-col gap-2 ">
                            <h1 className="text-md font-semibold"> Total Listing</h1>
                            <h4 className="text-xl font-bold">20</h4>
                        </div>
                        <div>
                            < RiListIndefinite className="text-2xl" />
                        </div>
                    </div>
                    <div className="border border-gray-300 bg-white h-25 w-50 rounded flex p-2  items-center justify-between ">
                        <div className="flex flex-col gap-2 ">
                            <h1 className="text-md font-semibold"> Total Revenue</h1>
                            <h4 className="text-xl font-bold">20</h4>
                        </div>
                        <div>
                            < BiDollarCircle className="text-2xl" />
                        </div>
                    </div>
                    <div className="border border-gray-300 bg-white h-25 w-50 rounded flex p-2  items-center justify-between ">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-md font-semibold"> Active Listings</h1>
                            <h4 className="text-xl font-bold">20</h4>
                        </div>
                        <div>
                            < RiListIndefinite className="text-2xl" />
                        </div>
                    </div>
                    <div className="border border-gray-300 bg-white h-25 w-50 rounded flex p-2  items-center justify-between ">
                        <div className=" flex flex-col gap-2">
                            <h1 className="text-md font-semibold"> Total Users</h1>
                            <h4 className="text-xl font-bold">20</h4>
                        </div>
                        <div>
                            < LuUsers className="text-2xl" />
                        </div>
                    </div>
                </div>

                <div>
                    <h1 className="mt-10 text-xl font-semibold">Recent listings</h1>


                    <table className="bg-white h-60  w-full">
                        <thead className=" flex items-center justify-between gap-4">
                            <tr className=" flex items-center justify-between gap-4">
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Category</th>
                                <th className="px-4 py-2">Status</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard