const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    when: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    body: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;