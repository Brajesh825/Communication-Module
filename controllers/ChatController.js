const ChatService = require('../services/ChatService');

class ChatController {
    constructor() {
        this.chatService = new ChatService();
    }

    // Send chat message
    async sendMessage(req, res) {
        try {
            const { from, to, content } = req.body;
            const message = await this.chatService.sendChatMessage(from, to, content);

            // WebSocket trigger event for new message
            // Implement WebSocket logic here

            res.status(201).json({ message });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to send message' });
        }
    }

    // Edit chat message
    async editMessage(req, res) {
        try {
            const { messageId } = req.params;
            const { editedContent } = req.body;
            const updatedMessage = await this.chatService.editChatMessage(messageId, editedContent);

            // WebSocket trigger event for message edit
            // Implement WebSocket logic here

            res.status(200).json({ message: 'Message edited successfully', updatedMessage });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to edit message' });
        }
    }
}

module.exports = ChatController;
