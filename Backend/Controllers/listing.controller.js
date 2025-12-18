const listing_service = require('../services/listing.service');

class listing_controller {
    
    async create_listing(req, res) {
        try {
            console.log("FILE: listing.controller.js | create_listing | Request received");
            
            const listing_data = req.body;
            const result = await listing_service.create_listing(listing_data);
            
            return res.status(201).json({
                STATUS: "SUCCESSFUL",
                ERROR_CODE: "",
                ERROR_FILTER: "",
                ERROR_DESCRIPTION: "",
                DB_DATA: result
            });
        } catch (error) {
            console.error("FILE: listing.controller.js | create_listing | Error:", error);
            
            return res.status(400).json({
                STATUS: "ERROR",
                ERROR_FILTER: "TECHNICAL_ISSUE",
                ERROR_CODE: "VTAPP-LST001",
                ERROR_DESCRIPTION: error.message
            });
        }
    }

    async get_all_listings(req, res) {
        try {
            console.log("FILE: listing.controller.js | get_all_listings | Request received");
            
            const listings = await listing_service.get_all_listings();
            
            return res.status(200).json({
                STATUS: "SUCCESSFUL",
                ERROR_CODE: "",
                ERROR_FILTER: "",
                ERROR_DESCRIPTION: "",
                DB_DATA: { listings }
            });
        } catch (error) {
            console.error("FILE: listing.controller.js | get_all_listings | Error:", error);
            
            return res.status(400).json({
                STATUS: "ERROR",
                ERROR_FILTER: "TECHNICAL_ISSUE",
                ERROR_CODE: "VTAPP-LST002",
                ERROR_DESCRIPTION: error.message
            });
        }
    }

    async get_listing_by_id(req, res) {
        try {
            console.log("FILE: listing.controller.js | get_listing_by_id | Request received");
            
            const { id } = req.params;
            const listing = await listing_service.get_listing_by_id(id);
            
            return res.status(200).json({
                STATUS: "SUCCESSFUL",
                ERROR_CODE: "",
                ERROR_FILTER: "",
                ERROR_DESCRIPTION: "",
                DB_DATA: { listing }
            });
        } catch (error) {
            console.error("FILE: listing.controller.js | get_listing_by_id | Error:", error);
            
            return res.status(404).json({
                STATUS: "ERROR",
                ERROR_FILTER: "INVALID_REQUEST",
                ERROR_CODE: "VTAPP-LST003",
                ERROR_DESCRIPTION: error.message
            });
        }
    }

    async filter_listings(req, res) {
        try {
            console.log("FILE: listing.controller.js | filter_listings | Request received");
            
            const filter_params = req.query;
            const listings = await listing_service.filter_listings(filter_params);
            
            return res.status(200).json({
                STATUS: "SUCCESSFUL",
                ERROR_CODE: "",
                ERROR_FILTER: "",
                ERROR_DESCRIPTION: "",
                DB_DATA: { listings }
            });
        } catch (error) {
            console.error("FILE: listing.controller.js | filter_listings | Error:", error);
            
            return res.status(400).json({
                STATUS: "ERROR",
                ERROR_FILTER: "TECHNICAL_ISSUE",
                ERROR_CODE: "VTAPP-LST004",
                ERROR_DESCRIPTION: error.message
            });
        }
    }

    async update_listing(req, res) {
        try {
            console.log("FILE: listing.controller.js | update_listing | Request received");
            
            const { id } = req.params;
            const update_data = req.body;
            const listing = await listing_service.update_listing(id, update_data);
            
            return res.status(200).json({
                STATUS: "SUCCESSFUL",
                ERROR_CODE: "",
                ERROR_FILTER: "",
                ERROR_DESCRIPTION: "",
                DB_DATA: { listing }
            });
        } catch (error) {
            console.error("FILE: listing.controller.js | update_listing | Error:", error);
            
            return res.status(400).json({
                STATUS: "ERROR",
                ERROR_FILTER: "TECHNICAL_ISSUE",
                ERROR_CODE: "VTAPP-LST005",
                ERROR_DESCRIPTION: error.message
            });
        }
    }

    async delete_listing(req, res) {
        try {
            console.log("FILE: listing.controller.js | delete_listing | Request received");
            
            const { id } = req.params;
            const listing = await listing_service.delete_listing(id);
            
            return res.status(200).json({
                STATUS: "SUCCESSFUL",
                ERROR_CODE: "",
                ERROR_FILTER: "",
                ERROR_DESCRIPTION: "",
                DB_DATA: { listing }
            });
        } catch (error) {
            console.error("FILE: listing.controller.js | delete_listing | Error:", error);
            
            return res.status(400).json({
                STATUS: "ERROR",
                ERROR_FILTER: "TECHNICAL_ISSUE",
                ERROR_CODE: "VTAPP-LST006",
                ERROR_DESCRIPTION: error.message
            });
        }
    }

    async get_total_listings(req, res) {
        try {
            console.log("FILE: listing.controller.js | get_total_listings | Request received");
            
            const count = await listing_service.get_total_listings();
            
            return res.status(200).json({
                STATUS: "SUCCESSFUL",
                ERROR_CODE: "",
                ERROR_FILTER: "",
                ERROR_DESCRIPTION: "",
                DB_DATA: { total_listings: count }
            });
        } catch (error) {
            console.error("FILE: listing.controller.js | get_total_listings | Error:", error);
            
            return res.status(400).json({
                STATUS: "ERROR",
                ERROR_FILTER: "TECHNICAL_ISSUE",
                ERROR_CODE: "VTAPP-LST007",
                ERROR_DESCRIPTION: error.message
            });
        }
    }

    async get_active_listings(req, res) {
        try {
            console.log("FILE: listing.controller.js | get_active_listings | Request received");
            
            const listings = await listing_service.get_active_listings();
            
            return res.status(200).json({
                STATUS: "SUCCESSFUL",
                ERROR_CODE: "",
                ERROR_FILTER: "",
                ERROR_DESCRIPTION: "",
                DB_DATA: { listings }
            });
        } catch (error) {
            console.error("FILE: listing.controller.js | get_active_listings | Error:", error);
            
            return res.status(400).json({
                STATUS: "ERROR",
                ERROR_FILTER: "TECHNICAL_ISSUE",
                ERROR_CODE: "VTAPP-LST008",
                ERROR_DESCRIPTION: error.message
            });
        }
    }

    async get_sold_listings(req, res) {
        try {
            console.log("FILE: listing.controller.js | get_sold_listings | Request received");
            
            const listings = await listing_service.get_sold_listings();
            
            return res.status(200).json({
                STATUS: "SUCCESSFUL",
                ERROR_CODE: "",
                ERROR_FILTER: "",
                ERROR_DESCRIPTION: "",
                DB_DATA: { listings }
            });
        } catch (error) {
            console.error("FILE: listing.controller.js | get_sold_listings | Error:", error);
            
            return res.status(400).json({
                STATUS: "ERROR",
                ERROR_FILTER: "TECHNICAL_ISSUE",
                ERROR_CODE: "VTAPP-LST009",
                ERROR_DESCRIPTION: error.message
            });
        }
    }

    async get_total_value(req, res) {
        try {
            console.log("FILE: listing.controller.js | get_total_value | Request received");
            
            const result = await listing_service.get_total_value();
            
            return res.status(200).json({
                STATUS: "SUCCESSFUL",
                ERROR_CODE: "",
                ERROR_FILTER: "",
                ERROR_DESCRIPTION: "",
                DB_DATA: result
            });
        } catch (error) {
            console.error("FILE: listing.controller.js | get_total_value | Error:", error);
            
            return res.status(400).json({
                STATUS: "ERROR",
                ERROR_FILTER: "TECHNICAL_ISSUE",
                ERROR_CODE: "VTAPP-LST010",
                ERROR_DESCRIPTION: error.message
            });
        }
    }
}

module.exports = new listing_controller();