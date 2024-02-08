const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    description: String,
    adddedUsers: [{ type: mongoose.Schema.Types.ObjectsId, ref: 'User' }],
})

const Room = mongoose.model('Room', roomSchema)

model.exports = Room;