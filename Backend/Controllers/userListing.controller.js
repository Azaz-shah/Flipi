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

module.exports = {
    createListing,
    totalListing,
    activeListing,
    soldListing,
    totalValue
}