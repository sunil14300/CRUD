const mongoose = require('mongoose');

const NewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: false 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: { 
        type: String,
        required: true
    }
}, { timestamps: true });

const RegisterModel = mongoose.model('Register', NewSchema);

module.exports = RegisterModel;
