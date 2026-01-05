const prisma = require("../prisma/index")
const connectRabbitMQ = require("../services/queue/connection")
const redisClient = require("../services/queue/redisClient")

//Sending to queue
const sendToQueue = async (listing) => {
    try {
        const channel = await connectRabbitMQ()
        await channel.assertQueue('listing')
        channel.sendToQueue('listing', Buffer.from(JSON.stringify(listing)))
        console.log('Listing sent to queue:', listing.id)
    } catch (error) {
        console.error('Queue error:', error.message)
    }
}

const createListing = async (req, res) => {
    try {
        const {
            title,
            plateform,
            userName,
            category,
            followers,
            Engagement_Rate,
            impression,
            country,
            age,
            price,
            description
        } = req.body

        const listing = await prisma.listing.create({
            data: {
                title,
                plateform,
                userName,
                category,
                followers,
                Engagement_Rate,
                impression,
                country,
                age,
                price,
                description
            }
        })

        // Clear cache after creating new listing
        await redisClient.del("listings:all")

        // Send to queue after successful creation
        await sendToQueue(listing)

        res.status(201).json({
            status: "success",
            data: {
                listing
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

const totalListing = async (req, res) => {
    try {
        const listings = await prisma.Listing.findMany()

        res.status(200).json({
            status: "success",
            data: {
                listing: listings,
                count: listings.length
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

const getAllListings = async (req, res) => {
    try {

        const cachedKey = "listings:all";
        const cachedListings = await redisClient.get(cachedKey);

        if (cachedListings) {
            return res.status(200).json({
                status: "success",
                data: {
                    listings: JSON.parse(cachedListings)
                }
            });
        }
        const listings = await prisma.listing.findMany()

        await redisClient.setEx(
            cachedKey,
            60,
            JSON.stringify(listings)
        );


        res.status(200).json({
            status: "success",
            data: {
                listings
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

const activeListing = async (req, res) => {
    try {
        const listing = await prisma.listing.findMany({
            where: {
                isActive: true
            }
        })
        if (!listing) {
            return res.status(404).json({
                status: "fail",
                message: "No Active listing found"
            })
        }
        res.status(200).json({
            status: "success",
            data: {
                listing
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

const soldListing = async (req, res) => {
    try {
        const listing = await prisma.listing.findMany({
            where: {
                sold: true
            }
        })
        if (!listing) {
            return res.status(404).json({
                status: "fail",
                message: "No sold listing found"
            })
        }
        res.status(200).json({
            status: "success",
            data: {
                listing
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

const totalValue = async (req, res) => {
    try {
        const listing = await prisma.listing.aggregate({
            _sum: {
                price: true
            }
        })
        if (!listing) {
            return res.status(404).json({
                status: "fail",
                message: "No sold listing found"
            })
        }
        res.status(200).json({
            status: "success",
            data: {
                listing
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

const deleteListing = async (req, res) => {
    try {
        const list = await prisma.listing.delete({
            where: {
                id: req.params.id
            }
        })

        // Clear cache after deletion
        await redisClient.del("listings:all")

        res.status(200).json({
            status: "success",
            data: {
                list
            }
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

const updateListing = async (req, res) => {
    try {
        const {
            title,
            plateform,
            userName,
            category,
            followers,
            Engagement_Rate,
            impression,
            country,
            age,
            price,
            description
        } = req.body

        const list = await prisma.listing.update({
            where: {
                id: req.params.id
            },
            data: {
                title,
                plateform,
                userName,
                category,
                followers,
                Engagement_Rate,
                impression,
                country,
                age,
                price,
                description
            }
        })

        // Clear cache after update
        await redisClient.del("listings:all")

        res.status(200).json({
            status: "success",
            data: {
                list
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

const filterListings = async (req, res) => {
    try {
        const { plateform, minPrice, maxPrice, category, Followers, maxFollowers, isVerified, isMonetized } = req.query

        const where = {}
        if (plateform) where.plateform = plateform
        if (category) where.category = category
        if (isVerified !== undefined) where.isVerified = isVerified === 'true'
        if (isMonetized !== undefined) where.isMonetized = isMonetized === 'true'

        if (minPrice || maxPrice) {
            where.price = {}
            if (minPrice) where.price.gte = parseInt(minPrice)
            if (maxPrice) where.price.lte = parseInt(maxPrice)
        }

        if (Followers || maxFollowers) {
            where.followers = {}
            if (Followers) where.followers.gte = parseInt(Followers)
            if (maxFollowers) where.followers.lte = parseInt(maxFollowers)
        }

        const listings = await prisma.listing.findMany({ where })

        res.status(200).json({
            status: "success",
            data: { listings }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

const getListById = async (req, res) => {
    try {
        const list = await prisma.Listing.findUnique({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            status: "success",
            data: {
                list
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })

    }
}

const getListingsByPlatform = async (req, res) => {
    try {
        const { platform } = req.params
        const listings = await prisma.listing.findMany({
            where: {
                plateform: platform
            }
        })
        res.status(200).json({
            status: "success",
            data: {
                listings
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

module.exports = {
    createListing,
    totalListing,
    activeListing,
    soldListing,
    totalValue,
    deleteListing,
    updateListing,
    filterListings,
    getListById,
    getAllListings,
    getListingsByPlatform
}
//     totalValue,
//     deleteListing,
//     updateListing,
//     filterListings,
//     getListById,
//     getAllListings,
//     getListingsByPlatform
// }