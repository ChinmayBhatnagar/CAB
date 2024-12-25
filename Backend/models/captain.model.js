const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long'],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate number must be at least 3 characters long'],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'moto'], // Ensuring consistent casing
        },
        location: {
            lat: {
                type: Number,
            },
            lng: {
                type: Number,
            },
        },
    },
});

// Pre-save hook to normalize vehicleType (capitalize first letter)
captainSchema.pre('save', function (next) {
    if (this.vehicle && this.vehicle.vehicleType) {
        // Normalize vehicleType to capitalize first letter
        this.vehicle.vehicleType = this.vehicle.vehicleType.charAt(0).toUpperCase() + this.vehicle.vehicleType.slice(1).toLowerCase();
    }
    next();
});

captainSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

captainSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
    return bcrypt.hash(password, 10);
};

const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;
