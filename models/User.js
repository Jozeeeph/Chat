const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');  // Import the package

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username must be at most 30 characters long'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: ['admin', 'user']
    },
    status: {
        type: Boolean,
        default: true
    },
    banned: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(uniqueValidator, { message: '{PATH} already exists. Please use a different value.' });

module.exports = mongoose.model('User', userSchema);
