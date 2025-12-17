import React from "react"
import { CiSearch } from "react-icons/ci";
const Messages = () => {
    return (
        <div className="border border-gray-300 h-120 p-10  m-10 ml-20">
            <h1 className="text-3xl font-bold ">Messages</h1>
            <h4 className="text-md fontsemibold">Chat with buyers and sellers</h4>

            <div className="bg-white h-10 w-100 flex flex-row items-center px-3 mt-6 rounded border border-gray-300">
                <CiSearch className="text-xl text-gray-400 mr-2" />
                <input className="flex-1 outline-none text-sm" type="text" placeholder="Search Conversations..." />
            </div>

            <div >
                <div className="border border-gray-300 flex items-center  justify-between h-30 rounded w-250 mt-7">
                    <div className="flex flex-row gap-2 items-center">
                        <div className="bg-blue-700 flex items-center justify-center h-13 w-13 ml-4 rounded-xl">
                            <h1 className="text-xl font-semibold text-white">S</h1>
                        </div>
                        <div className="ml-4">
                            <h2 className="text-md font-semibold">Tiktok</h2>
                            <h4 className="text-sm font-semibold">Muhammad ALi</h4>
                            <p className="text-blue-600 font-bold">Hi</p>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 mr-4">
                        <h4 className="text-sm font-semibold">Yesterday</h4>
                        <p className="text-sm font-semibold">23:40</p>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Messages