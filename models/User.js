const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const cardSchema = new mongoose.Schema({
    type: { type: String, required: true },
    number: { type: String, required: true },
    holder: { type: String, required: true },
    expiry: { type: String, required: true },
    cvc: { type: String, required: true }
});

const addressSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, default: 'India' },
    phone: { type: String, required: true },
    isDefault: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: ''
    },
    // Keep old address for backward compatibility if needed, but mainly use addresses array
    address: {
        type: String,
        default: ''
    },
    addresses: [addressSchema],
    cards: [cardSchema],
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    verificationTokenExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {
    timestamps: true
});

// Encrypt password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
