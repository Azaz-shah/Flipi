import React, { useEffect } from 'react'
import { FaTiktok } from "react-icons/fa"
import { MdVerified } from "react-icons/md"
import { GoPerson } from "react-icons/go"
import { useListingStore } from '../store/store'

function Home() {
    const { listings, loading, error, fetchListings } = useListingStore()

    useEffect(() => {
        fetchListings()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl">Loading listings...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500">Error: {error}</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="flex justify-center">
                <div className="mt-40 flex flex-col items-center">
                    <h1 className="text-6xl font-semibold text-center">
                        Buy & Sell your <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent relative inline-block">social</span>
                        <br />
                        <span className="ml-20 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Profiles</span> Online.
                    </h1>
                    <h4 className="mt-10 text-md font-semibold text-gray-500 text-center">
                        A secure marketplace to buy and sell Instagram, YouTube, Twitter, Telegram
                        <br />
                        <span className="ml-35">and more - fast, safe and hassle-free.</span>
                    </h4>

                    <div className="h-13 rounded border-gray-200 flex items-center justify-between w-120 border-2 mt-10">
                        <input className="p-4 text-sm outline-none" type="text" placeholder="Search Account" />
                        <button className="bg-purple-600 cursor-pointer text-sm text-white font-semibold h-10 w-25 rounded mr-2">Search</button>
                    </div>
                </div>
            </div>

            {/* Latest Listings Section */}
            <div className="mt-20 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Latest Listings</h1>
                <h4 className="text-gray-500 font-semibold">Discover the hottest social profiles available right now.</h4>
            </div>

            {/* Listings Grid */}
            <div className="p-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                    {listings.map((listing) => (
                        <div key={listing.id} className="bg-white border p-6 border-gray-300 rounded-xl shadow-md">
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row items-center gap-2">
                                    <button className="bg-gray-100 flex items-center justify-center h-10 w-10 rounded">
                                        <FaTiktok />
                                    </button>
                                    <div className="flex flex-col">
                                        <h2 className="text-md font-bold">{listing.plateform}</h2>
                                        <h1>@{listing.userName}</h1>
                                    </div>
                                </div>
                                <div>
                                    {listing.isVerified && <MdVerified className="text-3xl text-green-600" />}
                                </div>
                            </div>

                            <div className="flex flex-row items-center justify-between mt-4">
                                <div className="flex flex-row gap-2 items-center">
                                    <GoPerson className="text-2xl font-bold" />
                                    <h4 className="font-bold">{listing.followers?.toLocaleString()}</h4>
                                    <p className="text-sm font-semibold">Followers</p>
                                </div>
                                <div>
                                    <h2>{listing.Engagement_Rate}% Engagement</h2>
                                </div>
                            </div>

                            <div className="mt-4">
                                <button className="bg-pink-400 h-7 px-4 font-semibold text-sm rounded-2xl text-white">
                                    {listing.category}
                                </button>
                                <h4 className="text-sm font-semibold mt-4 h-10 border-b border-gray-200 pb-2">
                                    {listing.description}
                                </h4>
                            </div>

                            <div className="mt-4 flex flex-row justify-between items-center">
                                <div className="flex flex-row gap-2 items-center">
                                    <h1 className="text-2xl font-bold">${listing.price}</h1>
                                    <p className="text-gray-600">USD</p>
                                </div>
                                <div>
                                    <button className="bg-purple-500 cursor-pointer h-10 px-4 text-white rounded text-sm font-semibold hover:bg-purple-600">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="flex justify-center mt-20">
                <div className="bg-gradient-to-r from-purple-200 to-pink-200 flex items-center justify-center h-85 w-full max-w-6xl rounded-lg mx-6">
                    <div className="flex flex-col items-center justify-center p-10 gap-4">
                        <button className="bg-purple-400 rounded-2xl text-sm font-bold h-10 w-40 text-white">Trusted by millions</button>
                        <h1 className="text-4xl font-bold text-center">
                            Sell your Social Accounts
                            <br />
                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent relative inline-block">with Confidence </span>
                            & Earn Money
                        </h1>
                        <h4 className="font-md text-center text-gray-700">
                            We are the leading social media marketplace that connects brands
                            <br />
                            with their customers With our user-friendly interface.
                        </h4>
                        <button className="h-10 w-40 bg-purple-600 rounded text-sm font-semibold text-white hover:bg-purple-700">
                            Get Started Today
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-20 bg-white">
                <div className="max-w-6xl mx-auto flex flex-row items-start gap-8 p-8">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold">
                            <span className="text-purple-700">Flip</span>earn
                            <span className="text-4xl text-purple-700">.</span>
                        </h1>
                        <p className="text-sm mt-4 leading-relaxed text-gray-600">
                            Flipearn is a social media marketplace. We are the leading social media marketplace that connects brands with their customers with our user-friendly interface.
                        </p>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold mb-4">Company</h2>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-600 hover:text-purple-600">About us</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-purple-600">Careers</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-purple-600">Contact us</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-purple-600">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold mb-4">Subscribe to our newsletter</h2>
                        <p className="text-sm text-gray-600 mb-4">The latest news, articles, and resources, sent to your inbox weekly.</p>
                        <div className="flex border border-gray-300 rounded">
                            <input 
                                className="flex-1 p-3 text-sm outline-none rounded-l" 
                                type="email" 
                                placeholder="Enter your email" 
                            />
                            <button className="bg-purple-600 text-white px-4 py-3 text-sm font-semibold rounded-r hover:bg-purple-700">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home