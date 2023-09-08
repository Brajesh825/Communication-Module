import WebSocketService from "../../services/WsService.js";

class ChatController {
    constructor(store) {
        this.controllerId = 'chat-controller';
        this.store = store;
        this.component = this.createChatPlaceholder();
        this.webSocketService = new WebSocketService("ws://localhost:3000"); // Inject the WebSocketService
        this.curentMessage = ''
    }

    createChatPlaceholder() {
        const chatControllerDiv = document.createElement("div");
        chatControllerDiv.id = this.controllerId;
        return chatControllerDiv;
    }

    async init() {
        this.appendChatToComponent();
        this.initWebSocket()
    }

    appendChatToComponent() {
        if (this.component) {
            const chatUI = this.createChatUI();
            this.component.appendChild(chatUI);
        }
    }

    createChatUI() {
        const chatUIContainer = document.createElement("div");
        chatUIContainer.classList.add("chat-ui-container");

        if (!this.store.getActiveFriend()) {
            chatUIContainer.appendChild(this.createEmptyChatContainer());
        } else {
            this.activeFriend = this.store.getActiveFriend();
            chatUIContainer.appendChild(this.createChatHeader());
            chatUIContainer.appendChild(this.createChatMessagesContainer());
            chatUIContainer.appendChild(this.createChatInputContainer());
        }

        return chatUIContainer;
    }

    // Create the empty chat container
    createEmptyChatContainer() {
        const emptyChatContainer = document.createElement("div");
        emptyChatContainer.classList.add("empty-chat-container");

        const chatComponentPlaceholder = document.createElement("div");
        chatComponentPlaceholder.classList.add("empty-chat-component");

        emptyChatContainer.appendChild(chatComponentPlaceholder);

        return emptyChatContainer;
    }

    // Create the chat header
    createChatHeader() {
        const chatHeader = document.createElement("div");
        chatHeader.classList.add("chat-header");

        chatHeader.appendChild(this.createProfilePic());
        chatHeader.appendChild(this.createFriendName());
        chatHeader.appendChild(this.createStatusDot());

        return chatHeader;
    }

    // Create the profile picture element
    createProfilePic() {
        const profilePic = document.createElement("img");
        profilePic.src = this.activeFriend.profilePic;
        profilePic.alt = this.activeFriend.name;
        profilePic.classList.add("profile-pic");
        return profilePic;
    }

    // Create the friend name element
    createFriendName() {
        const friendName = document.createElement("span");
        friendName.textContent = this.activeFriend.name;
        friendName.classList.add("friend-name");
        return friendName;
    }

    // Create the status dot element
    createStatusDot() {
        const statusDot = document.createElement("div");
        statusDot.classList.add("status-dot", this.activeFriend.status === "active" ? "active-status" : "inactive-status");
        return statusDot;
    }

    // Create the chat messages container
    createChatMessagesContainer() {
        const chatMessagesContainer = document.createElement("ul");
        chatMessagesContainer.classList.add("chat-messages");

        // Append existing messages to the chat messages container
        const messages = this.store.getMessages();
        messages.forEach((message) => {
            this.appendMessageToChat(chatMessagesContainer, message);
        });

        return chatMessagesContainer;
    }


    // Create the chat input container
    createChatInputContainer() {
        const chatInputContainer = document.createElement("div");
        chatInputContainer.classList.add("chat-input");

        chatInputContainer.appendChild(this.createMessageInput());
        chatInputContainer.appendChild(this.createSendButton());

        return chatInputContainer;
    }

    // Create the message input field
    createMessageInput() {
        const messageInput = document.createElement("input");
        messageInput.type = "text";
        messageInput.placeholder = "Type a message...";
        messageInput.classList.add("message-input");

        // Set the input value to the currentMessage
        messageInput.value = this.curentMessage;

        messageInput.addEventListener("change", (e) => {
            // Update the currentMessage when the input changes
            this.currentMessage = e.target.value;
            console.log(this.currentMessage);
        });

        return messageInput;
    }

    // Create the send button
    createSendButton() {
        const sendButton = document.createElement("button");
        sendButton.textContent = "Send";
        sendButton.classList.add("send-button");

        sendButton.addEventListener("click", () => {
            // Get the message from currentMessage
            const message = this.currentMessage.trim();

            if (message) {
                this.sendMessage(message);
                // Clear the input field after sending
                this.currentMessage = '';
                const messageInput = this.component.querySelector(".message-input");
                messageInput.value = '';
            }
        });

        return sendButton;
    }

    renderChat() {
        this.component.innerHTML = '';
        let chatComponent = this.createChatUI();
        this.component.appendChild(chatComponent);

        this.toggleChatDisplay();
    }

    getChatContainer() {
        return this.component;
    }

    showChatUI() {
        const chatUI = document.querySelector('.chat-ui-container');

        if (chatUI) {
            chatUI.style.display = 'flex';
            this.hideFriendList();
        }
    }

    hideFriendList() {
        const friendList = document.querySelector('.friends-list');
        if (friendList) {
            friendList.style.display = 'none';
            this.component.classList.add('chat-open');
        }
    }

    hideChatUI() {
        const chatUI = this.component.querySelector('.chat-ui-container');
        if (chatUI) {
            chatUI.style.display = 'none';
            this.showFriendList();
        }
    }

    showFriendList() {
        const friendList = document.querySelector('.friends-list');
        if (friendList) {
            friendList.style.display = 'block';
            this.component.classList.remove('chat-open');
        }
    }

    toggleCloseButton() {
        const chatToggleButton = document.createElement('button');
        chatToggleButton.classList.add('chat-toggle-button');
        chatToggleButton.textContent = 'X';

        chatToggleButton.addEventListener('click', () => {
            this.hideChatUI();
        });

        const chatHeader = this.component.querySelector('.chat-header');
        chatHeader.appendChild(chatToggleButton);
    }

    scrollToBottom() {
        window.scrollTo(0, document.documentElement.scrollHeight || document.body.scrollHeight);
    }

    toggleChatDisplay() {
        const chatUI = this.component.querySelector('.chat-ui-container');
        const screenWidth = window.innerWidth;

        if (screenWidth <= 768 && chatUI && (chatUI.style.display === 'none' || chatUI.style.display === '')) {
            this.showChatUI();
            this.toggleCloseButton();
            this.scrollToBottom();
        }
    }

    initWebSocket() {
        this.webSocketService.connect();
    }

    // Listen to incoming messages from the WebSocket
    listenToMessages() {
        this.webSocketService.listenToMessages((message) => {
            // Handle incoming message
            this.handleIncomingMessage(message);
        });
    }

    // Handle incoming messages
    handleIncomingMessage(message) {
        // Implement your logic to display the incoming message in the chat UI
        const chatMessagesContainer = this.component.querySelector(".chat-messages");
        if (chatMessagesContainer) {
            const messageElement = document.createElement("li");
            messageElement.textContent = message;
            messageElement.classList.add("chat-message");
            chatMessagesContainer.appendChild(messageElement);
        }
    }

    // Send a message using the WebSocket
    sendMessage(message) {
        if (this.store.getActiveFriend()) {
            // Get the active friend's ID
            const activeFriendId = this.store.getActiveFriend().id;

            // Update the store with the sent message
            this.store.addMessage(activeFriendId, {
                text: message,
                sender: 'user', // You can set the sender as needed
                timestamp: new Date().toISOString(), // You can set the timestamp as needed
            });

            // Append the sent message to the chat messages container
            const chatMessagesContainer = this.component.querySelector(".chat-messages");
            if (chatMessagesContainer) {
                this.appendMessageToChat(chatMessagesContainer, {
                    text: message,
                    sender: 'user',
                    timestamp: new Date().toISOString(),
                });
            }

            // Clear the currentMessage
            this.currentMessage = '';

            // Clear the input field
            const messageInput = this.component.querySelector(".message-input");
            messageInput.value = '';

            // You can also send the message to the server or perform other actions here
        }
    }

    appendMessageToChat(chatMessagesContainer, message) {
        const messageElement = document.createElement("div");
        messageElement.textContent = message.text;
    
        messageElement.classList.add("chat-message");
    
        // Determine the alignment of the message (left or right) based on sender
        if (message.sender === 'user') {
            messageElement.classList.add("user-message");
        } else {
            messageElement.classList.add("friend-message");
        }
    
        // Create a <span> element for the timestamp
        const timestampSpan = document.createElement("span");
        timestampSpan.textContent = this.formatTimestamp(message.timestamp);
        timestampSpan.classList.add("chat-message-timestamp");
    
        // Create a <span> element for the status (default: single tick)
        const statusSpan = document.createElement("span");
        statusSpan.textContent = "\u2713"; // Single tick symbol
        statusSpan.classList.add("chat-message-status");
    
        // Append the timestamp and status <span> elements to the message element
        messageElement.appendChild(timestampSpan);
        messageElement.appendChild(statusSpan);
    
        chatMessagesContainer.appendChild(messageElement);
    
        // Scroll to the bottom to show the latest message
        this.scrollToBottom();
    }

    // Don't forget to disconnect the WebSocket when the chat is closed or the page is unloaded
    disconnectWebSocket() {
        this.webSocketService.disconnect();
    }

    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for AM
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }


}

export default ChatController;
