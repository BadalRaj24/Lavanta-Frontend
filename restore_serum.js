import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
// Use the mongoose instance from backend to ensure model registration works
const mongoose = require('../backend/node_modules/mongoose');
const Product = require('../backend/models/Product.js');
const dotenv = require('dotenv'); // This one can be local

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../backend/.env') });
const uri = process.env.MONGO_URI;

const productData = {
    name: "Lavanta Naturals Niacinamide 10% Face Serum",
    price: 399,
    rating: 4.8,
    reviews: 128,
    image: "/images/lavanta_serum.jpg",
    images: [
        "/images/lavanta_serum.jpg",
        "/images/niacinamide-face-serum.jpg",
        "/images/niacinamide-face-serum-2.jpg"
    ],
    tag: "Best Seller",
    skinType: ["all", "dry", "sensitive"],
    description: "A light weight daily serum formulated to hidrate brighten and balance your skin without irritation.",
    category: "face",
    volume: "30ml",
    benefits: [
        "Control Acne & Breakouts",
        "Fades Dark Spots & Even Tone Skin",
        "Deep Hydration Without Oiliness",
        "Strengthens Skin Barrier & Soothes Skin "
    ],
    ingredients: "Niacinamide, Zinc PCA,  Hyaluronic Acid, Panthenol, Vitamin E",
    usage: "Apply 2-3 drops on clean face and neck. Massage gently in upward circular motions until fully observed. Use twice daily for best results.",
    isBestSeller: true
};

console.log("Connecting to DB to restore serum...");
mongoose.connect(uri || 'mongodb://127.0.0.1:27017/lavanta')
    .then(async () => {
        console.log("Connected.");

        // Check if exists
        const existing = await Product.findOne({ name: productData.name });
        if (existing) {
            console.log("Product exists. Updating isBestSeller...");
            existing.isBestSeller = true;
            existing.image = productData.image;
            existing.images = productData.images;
            await existing.save();
            console.log("Updated.");
        } else {
            console.log("Product missing. Inserting...");
            await Product.create(productData);
            console.log("Inserted.");
        }

        process.exit();
    })
    .catch(err => {
        console.error("Error:", err);
        process.exit(1);
    });
