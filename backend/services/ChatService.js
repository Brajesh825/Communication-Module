const ChatMessage = require('../models/MessageModel');

class ChatService {
    static async saveMessage(from, to, content) {
        const message = new ChatMessage({
            from,
            to,
            content
        });
        await message.save();
        return message;
    }

    static async getMessagesBetween(userId1, userId2) {
        return await ChatMessage.find({
            $or: [
                { from: userId1, to: userId2 },
                { from: userId2, to: userId1 }
            ]
        }).sort('timestamp');
    }
}

module.exports = ChatService;
