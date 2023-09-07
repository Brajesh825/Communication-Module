class ChatController {
    constructor(store) {
        this.controllerId = 'chat-controller';
        this.store = store;
        this.component = this.createChatPlaceholder();
    }

    createChatPlaceholder() {
        const chatControllerDiv = document.createElement("div");
        chatControllerDiv.id = this.controllerId;
        return chatControllerDiv;
    }

    async init() {
        this.appendChatToComponent();
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
            const emptyChatContainer = document.createElement("div");
            emptyChatContainer.classList.add("empty-chat-container");

            const chatComponentPlaceholder = document.createElement("div");
            chatComponentPlaceholder.classList.add("empty-chat-component");

            emptyChatContainer.appendChild(chatComponentPlaceholder);

            chatUIContainer.appendChild(emptyChatContainer);

            return chatUIContainer;
        }
        this.activeFriend = this.store.getActiveFriend();

        const chatHeader = document.createElement("div");
        chatHeader.classList.add("chat-header");

        const profilePic = document.createElement("img");
        profilePic.src = this.activeFriend.profilePic;
        profilePic.alt = this.activeFriend.name;
        profilePic.classList.add("profile-pic");

        const friendName = document.createElement("span");
        friendName.textContent = this.activeFriend.name;
        friendName.classList.add("friend-name");

        const statusDot = document.createElement("div");
        statusDot.classList.add("status-dot", this.activeFriend.status === "active" ? "active-status" : "inactive-status");

        chatHeader.appendChild(profilePic);
        chatHeader.appendChild(friendName);
        chatHeader.appendChild(statusDot);

        const chatMessagesContainer = document.createElement("ul");
        chatMessagesContainer.classList.add("chat-messages");

        const message1 = document.createElement("li");
        message1.textContent = "Hello!";
        message1.classList.add("chat-message");

        const message2 = document.createElement("li");
        message2.textContent = "Hi there!";
        message2.classList.add("chat-message");

        chatMessagesContainer.appendChild(message1);
        chatMessagesContainer.appendChild(message2);

        const chatInputContainer = document.createElement("div");
        chatInputContainer.classList.add("chat-input");

        const messageInput = document.createElement("input");
        messageInput.type = "text";
        messageInput.placeholder = "Type a message...";
        messageInput.classList.add("message-input");

        const sendButton = document.createElement("button");
        sendButton.textContent = "Send";
        sendButton.classList.add("send-button");

        chatInputContainer.appendChild(messageInput);
        chatInputContainer.appendChild(sendButton);

        const attachmentButton = document.createElement("input");
        attachmentButton.type = "file";
        attachmentButton.id = "attachment-input";
        attachmentButton.style.display = "none";
        attachmentButton.accept = "image/*";

        const attachmentLabel = document.createElement("label");
        attachmentLabel.htmlFor = "attachment-input";
        attachmentLabel.textContent = "Attach";

        attachmentButton.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const attachmentMessage = document.createElement("li");
                attachmentMessage.textContent = `Attachment: ${file.name}`;
                attachmentMessage.classList.add("chat-message");
                chatMessagesContainer.appendChild(attachmentMessage);

                e.target.value = "";
            }
        });

        chatInputContainer.appendChild(attachmentButton);
        chatInputContainer.appendChild(attachmentLabel);

        chatUIContainer.appendChild(chatHeader);
        chatUIContainer.appendChild(chatMessagesContainer);
        chatUIContainer.appendChild(chatInputContainer);

        return chatUIContainer;
    }

    renderChat() {
        let chatComponent = this.createChatUI();
        this.component.innerHTML = '';
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
}

export default ChatController;
