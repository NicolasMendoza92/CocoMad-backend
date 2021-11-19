const mongoose = require('mongoose');
const MessageSchema = mongoose.Schema({
    senderName: {
        type: String,
        required: true,
        trim: true,
    },
    senderIg: {
        type: String,
        required: true,
        trim: true,
    },
    senderEmail: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    register: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Message', MessageSchema);