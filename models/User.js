const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    streetName: String,
    houseNumber: Number,
    city: String,
    postalCode: String
});

module.exports = mongoose.model('User', UserSchema)
