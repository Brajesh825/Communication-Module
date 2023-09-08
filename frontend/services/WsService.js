class WebSocketService {
    constructor(serverURL) {
        this.socket = null;
        this.serverURL = serverURL; // The URL of your WebSocket server
    }

    connect() {
        // Establish a WebSocket connection to the server
        this.socket = io(this.serverURL);
        this.socket.on("connect", () => {
            console.log("WebSocket connected.");
        });
    }

    disconnect() {
        // Close the WebSocket connection
        if (this.socket) {
            this.socket.disconnect();
        }
    }


    sendMessage(receiver,message) {
        if (this.socket) {
            // Send a message to the server
            this.socket.emit("message", { receiver, message });
        }
    }

    listenToMessages(callback) {
        if (this.socket) {
            // Listen for incoming messages and invoke the callback with the message data
            this.socket.on("message", (data) => {
                callback(data.message);
            });
        }
    }
}

export default WebSocketService;