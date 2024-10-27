const mongoose = require('mongoose');

// Define sub-schema for the store information
const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: "N/A"
    },
    webpage: {
        type: String
    }
});

// Define sub-schema for the order details
const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

// Define sub-schema for each item in the purchased items array
const purchasedItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    notes: {
        type: String,
        default: "tbd"
    },
    currency: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Main schema to combine the sub-schemas
const dataSchema = new mongoose.Schema({
    store: storeSchema,
    order: orderSchema,
    purchasedItems: [purchasedItemSchema]
});

module.exports = mongoose.model('Data', dataSchema);
