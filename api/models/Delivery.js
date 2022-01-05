const mongoose = require('mongoose');
const deliverySchema = mongoose.Schema({
    buyerData: {
        buyerEmail: {
            type: String,
            required: true,
            trim: true,
        },
        buyerName: {
            type: String,
            required: true,
            trim: true,
        },
        buyerLastName: {
            type: String,
            required: true,
            trim: true,
        },
        buyerCelphone: {
            type: String,
            required: true,
            trim: true,
        },
        buyerId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        registerBuy: {
            type: Date,
            default: Date.now(),
        },
    },
    buyerConditions:{
        pickUp:{
            type: String,
            required: true,
            trim: true,
        },
        deliveryDate: {
            type: Date,
            required: true,
            trim: true,
        },
        deliveryHour: {
            type: String,
            required: true,
            trim: true,
        },
        payMethod:{
            type: String,
            required: true,
            trim: true,
        },
    },
    buyerShipping: {
        buyerAddress1: {
            type: String,
            required: true,
            trim: true,
        },
        buyerAddress2: {
            type: String,
            trim: true,
        },
        buyerCity: {
            type: String,
            required: true,
            trim: true,
        },
        buyerState: {
            type: String,
            required: true,
            trim: true,
        },
        buyerZip: {
            type: String,
            required: true,
            trim: true,
        },
        buyerShippingIntructions: {
            type: String,
            trim: true,
        },
    },
    productsList: {
        type: Array,
    },
});

module.exports = mongoose.model('Delivery', deliverySchema);