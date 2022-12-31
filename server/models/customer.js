const mongoose = require('mongoose'), { Schema } = mongoose,

    customerSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String
        },
        token: {
            type: String
        }
    },
        {
            Timestamps: true
        }
    );

    module.exports = mongoose.model('customer',customerSchema)