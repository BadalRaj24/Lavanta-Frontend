const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    image: { type: String, required: true }, // Main display image
    images: [{ type: String }], // Gallery images
    tag: { type: String },
    skinType: [{ type: String }],
    description: { type: String },

    // Rich Data Fields
    category: { type: String, required: true }, // face, hair, body, etc.
    volume: { type: String }, // e.g., "30ml", "100g"
    benefits: [{ type: String }], // Array of key benefits
    ingredients: { type: String }, // Full ingredient list text
    usage: { type: String }, // How to use instructions

    stock: { type: Number, default: 100 },
    isBestSeller: { type: Boolean, default: false },
    isNewLaunch: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
