const listing_data_repository = require('../data_repositories/listing.data_repository');
const redis = require('../_core_app_connectivities/redis');
const rabbitmq_ops = require('../_core_app_connectivities/rabbitmq');

class listing_service {
    constructor() {
        console.log("FILE: listing.service.js | constructor | Service initialized");
    }

    async create_listing(listing_data) {
        try {
            console.log(`FILE: listing.service.js | create_listing | Creating listing: ${listing_data.title}`);
            
            const listing = await listing_data_repository.create_listing(listing_data);
            
            // Clear cache after creating new listing
            await this.clear_listings_cache();
            
            // Send to queue for processing
            await rabbitmq_ops.send_to_queue('listing', listing);
            
            console.log(`FILE: listing.service.js | create_listing | Listing created successfully: ${listing.id}`);
            return listing;
        } catch (error) {
            console.error(`FILE: listing.service.js | create_listing | Error:`, error);
            throw error;
        }
    }

    async get_all_listings() {
        try {
            console.log("FILE: listing.service.js | get_all_listings | Fetching all listings");
            
            const cache_key = "listings:all";
            
            // Try to get from cache first
            const cached_listings = await redis.get(cache_key);
            if (cached_listings) {
                console.log("FILE: listing.service.js | get_all_listings | Returning cached data");
                return JSON.parse(cached_listings);
            }
            
            // Get from database
            const listings = await listing_data_repository.get_all_listings();
            
            // Cache for 60 seconds
            await redis.setEx(cache_key, 60, JSON.stringify(listings));
            
            console.log(`FILE: listing.service.js | get_all_listings | Retrieved ${listings.length} listings`);
            return listings;
        } catch (error) {
            console.error(`FILE: listing.service.js | get_all_listings | Error:`, error);
            throw error;
        }
    }

    async get_listing_by_id(listing_id) {
        try {
            console.log(`FILE: listing.service.js | get_listing_by_id | Fetching listing: ${listing_id}`);
            
            const listing = await listing_data_repository.get_listing_by_id(listing_id);
            
            if (!listing) {
                throw new Error('Listing not found');
            }
            
            return listing;
        } catch (error) {
            console.error(`FILE: listing.service.js | get_listing_by_id | Error:`, error);
            throw error;
        }
    }

    async filter_listings(filter_params) {
        try {
            console.log("FILE: listing.service.js | filter_listings | Applying filters");
            
            const { plateform, minPrice, maxPrice, category, minFollowers, maxFollowers, isVerified, isMonetized } = filter_params;
            
            const where = {};
            if (plateform) where.plateform = plateform;
            if (category) where.category = category;
            if (isVerified !== undefined) where.isVerified = isVerified === 'true';
            if (isMonetized !== undefined) where.isMonetized = isMonetized === 'true';
            
            if (minPrice || maxPrice) {
                where.price = {};
                if (minPrice) where.price.gte = parseInt(minPrice);
                if (maxPrice) where.price.lte = parseInt(maxPrice);
            }
            
            if (minFollowers || maxFollowers) {
                where.followers = {};
                if (minFollowers) where.followers.gte = parseInt(minFollowers);
                if (maxFollowers) where.followers.lte = parseInt(maxFollowers);
            }
            
            const listings = await listing_data_repository.get_listings_by_filter(where);
            
            console.log(`FILE: listing.service.js | filter_listings | Found ${listings.length} filtered listings`);
            return listings;
        } catch (error) {
            console.error(`FILE: listing.service.js | filter_listings | Error:`, error);
            throw error;
        }
    }

    async update_listing(listing_id, update_data) {
        try {
            console.log(`FILE: listing.service.js | update_listing | Updating listing: ${listing_id}`);
            
            const listing = await listing_data_repository.update_listing(listing_id, update_data);
            
            // Clear cache after update
            await this.clear_listings_cache();
            
            console.log(`FILE: listing.service.js | update_listing | Listing updated successfully: ${listing_id}`);
            return listing;
        } catch (error) {
            console.error(`FILE: listing.service.js | update_listing | Error:`, error);
            throw error;
        }
    }

    async delete_listing(listing_id) {
        try {
            console.log(`FILE: listing.service.js | delete_listing | Deleting listing: ${listing_id}`);
            
            const listing = await listing_data_repository.delete_listing(listing_id);
            
            // Clear cache after deletion
            await this.clear_listings_cache();
            
            console.log(`FILE: listing.service.js | delete_listing | Listing deleted successfully: ${listing_id}`);
            return listing;
        } catch (error) {
            console.error(`FILE: listing.service.js | delete_listing | Error:`, error);
            throw error;
        }
    }

    async get_total_listings() {
        try {
            console.log("FILE: listing.service.js | get_total_listings | Getting total count");
            
            const count = await listing_data_repository.count_listings();
            return count;
        } catch (error) {
            console.error(`FILE: listing.service.js | get_total_listings | Error:`, error);
            throw error;
        }
    }

    async get_active_listings() {
        try {
            console.log("FILE: listing.service.js | get_active_listings | Getting active listings");
            
            const listings = await listing_data_repository.get_active_listings();
            return listings;
        } catch (error) {
            console.error(`FILE: listing.service.js | get_active_listings | Error:`, error);
            throw error;
        }
    }

    async get_sold_listings() {
        try {
            console.log("FILE: listing.service.js | get_sold_listings | Getting sold listings");
            
            const listings = await listing_data_repository.get_sold_listings();
            return listings;
        } catch (error) {
            console.error(`FILE: listing.service.js | get_sold_listings | Error:`, error);
            throw error;
        }
    }

    async get_total_value() {
        try {
            console.log("FILE: listing.service.js | get_total_value | Getting total value");
            
            const result = await listing_data_repository.get_total_value();
            return result;
        } catch (error) {
            console.error(`FILE: listing.service.js | get_total_value | Error:`, error);
            throw error;
        }
    }

    async clear_listings_cache() {
        try {
            await redis.del("listings:all");
            console.log("FILE: listing.service.js | clear_listings_cache | Cache cleared");
        } catch (error) {
            console.error("FILE: listing.service.js | clear_listings_cache | Error clearing cache:", error);
        }
    }
}

module.exports = new listing_service();