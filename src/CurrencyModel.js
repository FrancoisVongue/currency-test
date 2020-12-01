const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator(v) {
                return typeof v === 'string' && v.length === 3;
            },
            message: 'code must be a string of length 3'
        }
    },
    course: {
        type: Number,
        required: true,
    }
})
exports.Currency = mongoose.model('Currency', currencySchema);
