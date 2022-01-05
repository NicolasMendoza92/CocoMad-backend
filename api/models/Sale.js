const mongoose = require('mongoose');
const salesSchema = mongoose.Schema({
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
            type: String,
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
    productsList: {
        type: Array,
    },
});

module.exports = mongoose.model('Sale', salesSchema);