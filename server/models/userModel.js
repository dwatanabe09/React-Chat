const mongoose = require('mognoose')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true },
})

const User = mongoose.model('User', userSchema)

module.exports = User;