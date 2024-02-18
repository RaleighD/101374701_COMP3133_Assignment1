const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: {
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
        unique: true,
        trim: true,
        lowercase: true,
        //A Little email validation regex attempt
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other'],
    },
    salary: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
