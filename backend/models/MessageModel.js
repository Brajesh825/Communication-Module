const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
    from: mongoose.Schema.Types.ObjectId,
    to: mongoose.Schema.Types.ObjectId,
    content: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
