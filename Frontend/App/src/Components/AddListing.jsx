import React, { useState } from "react"
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";

const AddListing = () => {
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [selectedNiche, setSelectedNiche] = useState('');
    const [selectedAudience, setSelectedAudience] = useState('');
    const [isAudienceDropdownOpen, setIsAudienceDropdownOpen] = useState(false);
    const [isPlatformDropdownOpen, setIsPlatformDropdownOpen] = useState(false);
    const [isNicheDropdownOpen, setIsNicheDropdownOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const platforms = ['Instagram', 'TikTok', 'YouTube', 'Facebook', 'LinkedIn', 'Twitter'];
    const niches = ['food', 'lifestyle', 'entertainment', 'health', 'beauty', 'finance', 'education', 'gaming', 'sports'];
    const audienceRange = ['13-17 Year', '18-24 Year', '25-34 Year', '35-44 Year', '45-54 Year', '55-64 Year', '65+ Year'];


    const handlePlatformSelect = (platform) => {
        setSelectedPlatform(platform);
        setIsPlatformDropdownOpen(false);
    }

    const handleNicheSelect = (niche) => {
        setSelectedNiche(niche);
        setIsNicheDropdownOpen(false);
    }

    const handleAudienceSelect = (audience) => {
        setSelectedAudience(audience)
        setIsAudienceDropdownOpen(false)
    }

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        const filesWithPreviews = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setSelectedFiles(prev => [...prev, ...filesWithPreviews]);
    }

    const ChooseFile = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        input.onchange = handleFileSelect;
        input.click();
    }

    const removeFile = (index) => {
        // Clean up the preview URL to prevent memory leaks
        URL.revokeObjectURL(selectedFiles[index].preview);
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    }
    return (
        <div className="ml-40 mt-10 w-200 pb-10">
            <div>
                <h1 className="text-3xl font-semibold">List Your Account</h1>
                <p className="text-md font-medium mt-3 text-gray-400">Create a mock listing to display your account info</p>
            </div>

            <div className="border border-gray-300 p-6 rounded h-65 w-full mt-8">
                <h2 className="text-xl font-semibold">Basic Information</h2>

                <div className="mt-4 flex flex-row gap-6 ">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold">Listing Title *</label>
                        <input className="h-10 w-85 border border-gray-300 rounded mt-2 p-4" type="text" placeholder="Account Name" />
                    </div>
                    <div className="flex flex-col relative">
                        <label className="text-sm font-semibold">Platform *</label>
                        <div className="relative">
                            <input
                                className="h-10 w-85 border border-gray-300 rounded mt-2 p-4 pr-10 cursor-pointer"
                                type="text"
                                value={selectedPlatform}
                                placeholder="Select Platform"
                                readOnly
                                onClick={() => setIsPlatformDropdownOpen(!isPlatformDropdownOpen)}
                            />
                            <IoChevronDown
                                className={`absolute right-3 top-5 cursor-pointer transition-transform duration-200 ${isPlatformDropdownOpen ? 'rotate-180' : ''
                                    }`}
                                onClick={() => setIsPlatformDropdownOpen(!isPlatformDropdownOpen)}
                            />

                            {isPlatformDropdownOpen && (
                                <div className="absolute bottom-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                    {platforms.map((platform) => (
                                        <div
                                            key={platform}
                                            className="p-3 hover:bg-gray-50 cursor-pointer text-sm"
                                            onClick={() => handlePlatformSelect(platform)}
                                        >
                                            {platform}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex flex-row gap-6 ">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold">Username/Handle *</label>
                        <input className="h-10 w-85 border border-gray-300 rounded mt-2 p-4" type="text" placeholder="Account Name" />
                    </div>
                    <div className="flex flex-col relative">
                        <label className="text-sm font-semibold">Niche/Category *</label>
                        <div className="relative">
                            <input
                                className="h-10 w-85 border border-gray-300 rounded mt-2 p-4 pr-10 cursor-pointer"
                                type="text"
                                value={selectedNiche}
                                placeholder="Select Platform"
                                readOnly
                                onClick={() => setIsNicheDropdownOpen(!isNicheDropdownOpen)}
                            />
                            <IoChevronDown
                                className={`absolute right-3 top-5 cursor-pointer transition-transform duration-200 ${isNicheDropdownOpen ? 'rotate-180' : ''
                                    }`}
                                onClick={() => setIsNicheDropdownOpen(!isNicheDropdownOpen)}
                            />

                            {isNicheDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                    {niches.map((niche) => (
                                        <div
                                            key={niche}
                                            className="p-3 hover:bg-gray-50 cursor-pointer text-sm"
                                            onClick={() => handleNicheSelect(niche)}
                                        >
                                            {niche}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="border border-gray-300 p-6 rounded h-80 w-full mt-8">
                <h2 className="text-xl font-semibold">Account Metrics</h2>

                <div className="mt-4 flex flex-row gap-6 ">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold"> Followers Count *</label>
                        <input className="h-10 w-55 border border-gray-300 rounded mt-2 p-4" type="number" placeholder="10000" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold"> Engagement Rate (%)</label>
                        <input className="h-10 w-55 border border-gray-300 rounded mt-2 p-4" type="number" placeholder="4" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold"> Monthly Views/Impressions *</label>
                        <input className="h-10 w-55 border border-gray-300 rounded mt-2 p-4" type="number" placeholder="10000" />
                    </div>
                </div>

                <div className="mt-4 flex flex-row gap-6 ">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold">Primary Audience Country</label>
                        <input className="h-10 w-85 border border-gray-300 rounded mt-2 p-4" type="text" placeholder="United States" />
                    </div>
                    <div className="flex flex-col relative">
                        <label className="text-sm font-semibold">Primary Audience Age Range</label>
                        <div className="relative">
                            <input
                                className="h-10 w-85 border border-gray-300 rounded mt-2 p-4 pr-10 cursor-pointer"
                                type="text"
                                value={selectedAudience}
                                placeholder="Select...."
                                readOnly
                                onClick={() => setIsAudienceDropdownOpen(!isAudienceDropdownOpen)}
                            />
                            <IoChevronDown
                                className={`absolute right-3 top-5 cursor-pointer transition-transform duration-200 ${isAudienceDropdownOpen ? 'rotate-180' : ''
                                    }`}
                                onClick={() => setIsAudienceDropdownOpen(!isAudienceDropdownOpen)}
                            />

                            {isAudienceDropdownOpen && (
                                <div className="absolute bottom-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                    {audienceRange.map((audience) => (
                                        <div
                                            key={audience}
                                            className="p-3 hover:bg-gray-50 cursor-pointer text-sm"
                                            onClick={() => handleAudienceSelect(audience)}
                                        >
                                            {audience}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                <div className="mt-5 flex flex-row gap-2 cursor-pointer">
                    <input type="checkbox" />
                    <h4 className="text-sm font-semibold text-gray-500">Account is Verified on the plateform</h4>
                </div>
                <div className="mt-3 flex flex-row gap-2 cursor-pointer">
                    <input type="checkbox" />
                    <h4 className="text-sm font-semibold text-gray-500">Account is Monitized</h4>
                </div>
            </div>

            <div className="border border-gray-300 p-6 rounded h-90 w-full mt-8">
                <h2 className="text-xl font-semibold">Pricing $ Description</h2>

                <div className="mt-4 flex flex-row gap-6 ">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold">Asking Price (USD) *</label>
                        <input className="h-10 w-180 border border-gray-300 rounded mt-2 p-4" type="number" placeholder="100:00" />
                    </div>

                </div>

                <div className="mt-4 flex flex-row gap-6 ">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold">Description *</label>
                        <textarea className="h-40 w-180 border border-gray-300 rounded mt-2 p-4" type="text" />
                    </div>

                </div>
            </div>

            <div className="border border-gray-300 p-6 rounded w-full mt-8">
                <h2 className="text-xl font-semibold">Screenshots & Proof *</h2>

                <div className="mt-4">
                    <div className="h-50 w-180 border flex flex-col gap-2 items-center justify-center border-gray-300 rounded mt-2 p-4 border-dashed">
                        <FaArrowUpFromBracket className="text-3xl text-gray-400" />
                        <button onClick={ChooseFile} className="border cursor-pointer border-gray-300 text-sm font-semibold h-10 w-30 rounded hover:bg-gray-50">Choose Files</button>
                        <p className="text-sm font-semibold text-gray-400">Upload screenshots or proof of account analytics</p>
                        <p className="text-xs text-gray-400">Supported formats: JPG, PNG, GIF (Max 5MB each)</p>
                    </div>

                    {selectedFiles.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-sm font-semibold mb-4">Selected Images ({selectedFiles.length}):</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {selectedFiles.map((fileObj, index) => (
                                    <div key={index} className="relative group">
                                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                                            <img 
                                                src={fileObj.preview} 
                                                alt={fileObj.file.name}
                                                className="w-full h-32 object-cover"
                                            />
                                            <div className="p-2 bg-white">
                                                <p className="text-xs font-medium truncate">{fileObj.file.name}</p>
                                                <p className="text-xs text-gray-400">{(fileObj.file.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => removeFile(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
                <button className="border border-gray-400 rounded h-10 w-25 text-md  font-semibold">Cancel</button>
                <button className="bg-blue-500 cursor-pointer text-sm text-white font-semibold h-10 w-30 rounded ml-2"> Create Listing</button>
            </div>
        </div>
    )
}
export default AddListing