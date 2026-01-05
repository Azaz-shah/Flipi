const prisma = require("../prisma/index");

class listing_data_repository {
    constructor() {
        console.log("FILE: listing.data_repository.js | constructor | Data Repository initialized");
    }

    async create_listing(listing_data) {
        try {
            console.log(`FILE: listing.data_repository.js | create_listing | Creating listing: ${listing_data.title}`);

            const listing = await prisma.listing.create({
                data: listing_data
            });

            return listing;
        } catch (error) {
            console.error(`FILE: listing.data_repository.js | create_listing | Error:`, error);
            throw error;
        }
    }

    async get_all_listings() {
        try {
            console.log("FILE: listing.data_repository.js | get_all_listings | Fetching all listings");

            const result = await prisma.$runCommandRaw({
                find: "Listing",
                filter: { createdAt: { $ne: null } }
            });
            return result.cursor.firstBatch;
        } catch (error) {
            console.error(`FILE: listing.data_repository.js | get_all_listings | Error:`, error);
            throw error;
        }
    }

    async get_listing_by_id(listing_id) {
        try {
            console.log(`FILE: listing.data_repository.js | get_listing_by_id | Fetching listing: ${listing_id}`);

            const listing = await prisma.listing.findUnique({
                where: { id: listing_id }
            });

            return listing;
        } catch (error) {
            console.error(`FILE: listing.data_repository.js | get_listing_by_id | Error:`, error);
            throw error;
        }
    }

    async get_listings_by_filter(filter_criteria) {
        try {
            console.log("FILE: listing.data_repository.js | get_listings_by_filter | Applying filters");

            const result = await prisma.$runCommandRaw({
                find: "Listing",
                filter: { ...filter_criteria, createdAt: { $ne: null } }
            });

            return result.cursor.firstBatch;
        } catch (error) {
            console.error(`FILE: listing.data_repository.js | get_listings_by_filter | Error:`, error);
            throw error;
        }
    }

    async update_listing(listing_id, update_data) {
        try {
            console.log(`FILE: listing.data_repository.js | update_listing | Updating listing: ${listing_id}`);

            const listing = await prisma.listing.update({
                where: { id: listing_id },
                data: update_data
            });

            return listing;
        } catch (error) {
            console.error(`FILE: listing.data_repository.js | update_listing | Error:`, error);
            throw error;
        }
    }

    async delete_listing(listing_id) {
        try {
            console.log(`FILE: listing.data_repository.js | delete_listing | Deleting listing: ${listing_id}`);

            const listing = await prisma.listing.delete({
                where: { id: listing_id }
            });

            return listing;
        } catch (error) {
            console.error(`FILE: listing.data_repository.js | delete_listing | Error:`, error);
            throw error;
        }
    }

    async count_listings() {
        try {
            console.log("FILE: listing.data_repository.js | count_listings | Counting listings");

            const count = await prisma.listing.count();
            return count;
        } catch (error) {
            console.error(`FILE: listing.data_repository.js | count_listings | Error:`, error);
            throw error;
        }
    }

    async get_active_listings() {
        try {
            console.log("FILE: listing.data_repository.js | get_active_listings | Fetching active listings");

            const listings = await prisma.listing.findMany({
                where: { isActive: true }
            });

            return listings;
        } catch (error) {
            console.error(`FILE: listing.data_repository.js | get_active_listings | Error:`, error);
            throw error;
        }
    }

    async get_sold_listings() {
        try {
            console.log("FILE: listing.data_repository.js | get_sold_listings | Fetching sold listings");

            const listings = await prisma.listing.findMany({
                where: { sold: true }
            });

            return listings;
        } catch (error) {
            console.error(`FILE: listing.data_repository.js | get_sold_listings | Error:`, error);
            throw error;
        }
    }

    async get_total_value() {
        try {
            console.log("FILE: listing.data_repository.js | get_total_value | Calculating total value");

            const result = await prisma.listing.aggregate({
                _sum: { price: true }
            });

            return result;
        } catch (error) {
            console.error(`FILE: listing.data_repository.js | get_total_value | Error:`, error);
            throw error;
        }
    }
}

module.exports = new listing_data_repository();