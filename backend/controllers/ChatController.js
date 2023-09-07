const ChatService = require('../services/ChatService');

class ChatController {
    static async handleSendMessage(socket, data) {
        const { from, to, content } = data;
        await ChatService.sendMessage(from, to, content);
        socket.emit('messageSent', { from, to, content });
        socket.to(to).emit('messageReceived', { from, to, content });
    }
}

module.exports = ChatController;
