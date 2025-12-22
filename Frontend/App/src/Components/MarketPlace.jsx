import React, { useEffect, useState } from 'react'
import { useListingStore } from '../store/store'
import { FaTiktok, FaInstagram, FaYoutube, FaTwitter, FaFacebook } from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'
import { GoPerson } from 'react-icons/go'
import { FaUnlockKeyhole, FaRegStar } from 'react-icons/fa6'

const platformIcons = {
    TikTok: FaTiktok,
    Instagram: FaInstagram,
    YouTube: FaYoutube,
    Twitter: FaTwitter,
    Facebook: FaFacebook
}

function Marketplace() {
    const { listings, loading, error, fetchListings, filterListings } = useListingStore()
    const [filters, setFilters] = useState({
        plateform: '',
        category: '',
        minPrice: '',
        maxPrice: '',
        minFollowers: '',
        maxFollowers: ''
    })

    useEffect(() => {
        fetchListings()
    }, [])

    // Debug: Log the listings data
    console.log('Listings data:', listings)
    console.log('Listings length:', listings.length)

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters(prev => ({ ...prev, [name]: value }))
    }

    const applyFilters = () => {
        const activeFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== '')
        )
        if (Object.keys(activeFilters).length > 0) {
            filterListings(activeFilters)
        } else {
            fetchListings()
        }
    }

    const clearFilters = () => {
        setFilters({
            plateform: '',
            category: '',
            minPrice: '',
            maxPrice: '',
            minFollowers: '',
            maxFollowers: ''
        })
        fetchListings()
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl">Loading marketplace...</div>
            </div>
        )
    }

    return (
        <div className="p-6">
            {/* Filter Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">Filter Listings</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <select
                        name="plateform"
                        value={filters.plateform}
                        onChange={handleFilterChange}
                        className="border rounded p-2"
                    >
                        <option value="">All Platforms</option>
                        <option value="Instagram">Instagram</option>
                        <option value="YouTube">YouTube</option>
                        <option value="Twitter">Twitter</option>
                        <option value="TikTok">TikTok</option>
                        <option value="Facebook">Facebook</option>
                    </select>

                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        className="border rounded p-2"
                    >
                        <option value="">All Categories</option>
                        <option value="food">Food</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="health">Health</option>
                        <option value="beauty">Beauty</option>
                        <option value="finance">Finance</option>
                        <option value="education">Education</option>
                        <option value="gaming">Gaming</option>
                        <option value="sports">Sports</option>
                    </select>

                    <input
                        type="number"
                        name="minPrice"
                        placeholder="Min Price"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        className="border rounded p-2"
                    />

                    <input
                        type="number"
                        name="maxPrice"
                        placeholder="Max Price"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        className="border rounded p-2"
                    />

                    <input
                        type="number"
                        name="minFollowers"
                        placeholder="Min Followers"
                        value={filters.minFollowers}
                        onChange={handleFilterChange}
                        className="border rounded p-2"
                    />

                    <input
                        type="number"
                        name="maxFollowers"
                        placeholder="Max Followers"
                        value={filters.maxFollowers}
                        onChange={handleFilterChange}
                        className="border rounded p-2"
                    />
                </div>

                <div className="flex gap-4 mt-4">
                    <button
                        onClick={applyFilters}
                        className="bg-purple-600 text-white px-6 py-2 rounded font-semibold"
                    >
                        Apply Filters
                    </button>
                    <button
                        onClick={clearFilters}
                        className="bg-gray-500 text-white px-6 py-2 rounded font-semibold"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    Error: {error}
                </div>
            )}

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-40">
                {listings.map((listing) => {
                    const IconComponent = platformIcons[listing.plateform] || FaTiktok

                    return (
                        <div key={listing.id} className="bg-white border p-6 border-gray-200 h-70 rounded-xl w-100 shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row items-center gap-2">
                                    <button className="bg-gray-100 flex items-center justify-center h-10 w-10 rounded">
                                        <IconComponent className="text-xl" />
                                    </button>
                                    <div className="flex flex-col">
                                        <h2 className="text-md font-bold">{listing.plateform}</h2>
                                        <h1 className="text-sm text-gray-600">{listing.userName}</h1>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <FaUnlockKeyhole className="text-2xl text-gray-300" />
                                    <FaRegStar className="text-2xl text-yellow-500" />
                                </div>
                            </div>

                            <div className="flex flex-row items-center justify-between mt-3">
                                <div className="flex flex-row gap-2 items-center">
                                    <GoPerson className="text-2xl font-bold" />
                                    <h4 className="font-bold">{listing.followers?.toLocaleString()}</h4>
                                    <p className="text-sm font-semibold">Followers</p>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <span className="bg-pink-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        {listing.category}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h4 className="text-sm font-semibold border-b-1 pb-2">{listing.Engagement_Rate}% Engagement</h4>
                                <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                                    {listing.description}
                                </p>
                            </div>

                            <div className="mt-4 flex flex-row justify-between items-center">
                                <div className="flex flex-row gap-2 items-center">
                                    <h1 className="text-2xl font-bold">${listing.price}</h1>
                                    <p className="text-gray-600">USD</p>
                                </div>
                                <button className="bg-purple-600 text-white px-4 py-2 rounded font-semibold hover:bg-purple-700 transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {listings.length === 0 && !loading && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No listings found matching your criteria.</p>
                </div>
            )}
        </div>
    )
}

export default Marketplace