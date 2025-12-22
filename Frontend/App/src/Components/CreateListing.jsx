import React, { useState } from 'react'
import { useListingStore } from '../store/store'

function CreateListing() {
    const { createListing, loading, error } = useListingStore()
    const [formData, setFormData] = useState({
        title: '',
        plateform: '',
        userName: '',
        category: '',
        followers: '',
        Engagement_Rate: '',
        impression: '',
        country: '',
        age: '',
        price: '',
        description: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const listingData = {
            ...formData,
            followers: parseInt(formData.followers),
            Engagement_Rate: parseFloat(formData.Engagement_Rate),
            impression: parseInt(formData.impression),
            age: parseInt(formData.age),
            price: parseInt(formData.price)
        }

        await createListing(listingData)
        
        if (!error) {
            // Reset form on success
            setFormData({
                title: '',
                plateform: '',
                userName: '',
                category: '',
                followers: '',
                Engagement_Rate: '',
                impression: '',
                country: '',
                age: '',
                price: '',
                description: ''
            })
            alert('Listing created successfully!')
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Create New Listing</h2>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    Error: {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full border rounded p-2"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Platform</label>
                        <select
                            name="plateform"
                            value={formData.plateform}
                            onChange={handleChange}
                            required
                            className="w-full border rounded p-2"
                        >
                            <option value="">Select Platform</option>
                            <option value="Instagram">Instagram</option>
                            <option value="YouTube">YouTube</option>
                            <option value="Twitter">Twitter</option>
                            <option value="TikTok">TikTok</option>
                            <option value="Facebook">Facebook</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                            className="w-full border rounded p-2"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full border rounded p-2"
                    >
                        <option value="">Select Category</option>
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
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Followers</label>
                        <input
                            type="number"
                            name="followers"
                            value={formData.followers}
                            onChange={handleChange}
                            required
                            min="0"
                            className="w-full border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Engagement Rate (%)</label>
                        <input
                            type="number"
                            name="Engagement_Rate"
                            value={formData.Engagement_Rate}
                            onChange={handleChange}
                            required
                            min="0"
                            max="100"
                            step="0.1"
                            className="w-full border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Impressions</label>
                        <input
                            type="number"
                            name="impression"
                            value={formData.impression}
                            onChange={handleChange}
                            required
                            min="0"
                            className="w-full border rounded p-2"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                            className="w-full border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            min="13"
                            max="100"
                            className="w-full border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="1"
                            className="w-full border rounded p-2"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full border rounded p-2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-600 text-white py-3 rounded font-semibold hover:bg-purple-700 disabled:opacity-50"
                >
                    {loading ? 'Creating...' : 'Create Listing'}
                </button>
            </form>
        </div>
    )
}

export default CreateListing