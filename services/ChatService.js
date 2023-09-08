const ChatMessage = require('../models/ChatMessage');

class ChatService {
    constructor() {}

    // Send chat message
    async sendChatMessage(from, to, content) {
        const message = new ChatMessage({
            from,
            to,
            content,
            timeline: [{ content, date: new Date() }], // Create initial timeline entry
        });

        await message.save();
        return message;
    }

    // Edit chat message
    async editChatMessage(messageId, editedContent) {
        const message = await ChatMessage.findById(messageId);
        if (!message) {
            throw new Error('Message not found');
        }

        // Add the edited entry to the timeline
        message.timeline.push({ content: editedContent, date: new Date() });

        // Update the timestamp to the current date
        message.timestamp = new Date();

        await message.save();
        return message;
    }
}

module.exports = ChatService;
