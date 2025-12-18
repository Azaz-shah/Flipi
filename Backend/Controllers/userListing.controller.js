const prisma = require("../prisma/index")

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

        const listing = await prisma.Listing.create({
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
        const listing = await prisma.listing.count()

        if (!listing) {
            return res.status(404).json({
                status: "fail",
                message: "No listing found"
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

        const list = await prisma.Listing.update({
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
        const listings = await prisma.Listing.findMany({
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
    getListingsByPlatform
}