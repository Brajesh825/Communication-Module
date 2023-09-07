const socketIO = require('socket.io');
const ChatController = require('./controllers/ChatController');
const CallController = require('./controllers/CallController');
class WebSocket {
    static configure(server) {
        const io = socketIO(server);

        io.on('connection', (socket) => {
            socket.on('sendMessage', async (data) => {
                // Save the message in the database
                const savedMessage = await ChatService.saveMessage(data.from, data.to, data.content);

                // Emit to the recipient
                socket.to(data.to).emit('messageReceived', {
                    from: { id: savedMessage.from, username: 'usernameOfSender' }, // Fetch the usernameOfSender from the database or from 'data'
                    content: savedMessage.content
                });
            });
            socket.on('initiateCall', (data) => {
                CallController.handleInitiateCall(socket, data);
            });
        });
    }
}

module.exports = WebSocket;
