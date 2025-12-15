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

module.exports = {
    createListing
}