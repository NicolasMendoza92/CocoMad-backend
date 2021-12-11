const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
    imageDetail: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true, 
    },
    price: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Product', ProductSchema);