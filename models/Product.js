const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);