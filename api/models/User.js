const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  knowcoco: {
    type: String,
    required: true,
    trim: true,
    enum: ['si', 'no', 'ire'],
  },
  register: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: String,
    default: 'user',
    trim: true,
  },
  image: {
    type: String,
    trime: true,
  },
});

module.exports = mongoose.model("User", usersSchema);