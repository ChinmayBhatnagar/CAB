const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const captinSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength: [3, 'first'],
        },
        lastname:{
            type: String,
            minlength: [3, 'Last']
        }
    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        minlength:[/^|S+@|S+|.|S+$/, 'PLEASE ENTER VALID email']
    },
    password:{
        type: String,
        required:true,
        select: false,
    },
    socketId:{
        type: String,
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            minlength: [3, 'color'],
        },
        plate:{
            type: String,
            required: true,
            minlength: [3, 'plate'],
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, 'capacity'],
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ['Car', 'bike', 'auto'],
        },
        location:{
            lat:{
                type: Number,
            },
            lng:{
                type: Number,
            }
        }
    }
})

captinSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captinSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captinSchema.static.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const captinModel = mongoose.model('captin', captinSchema);

module.exports = captinModel;