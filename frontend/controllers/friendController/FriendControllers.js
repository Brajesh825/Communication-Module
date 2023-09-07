// FriendController.js

import FriendService from '../../services/FriendServices.js';

class FriendController {
    constructor() {
        this.controllerId = "friend-controller";
        this.friends = []; // Array to store friend objects
        this.activeFriend = null; // Currently active friend
        this.component = this.createFriendsPlaceholder(); // Create a placeholder for the component during construction
    }

    toggleChatDisplay() {
        const chatUI = this.component.querySelector('.chat-ui-container');
        const friendList = this.component.querySelector('.friends-list');
        const screenWidth = window.innerWidth; // Get the current screen width

        if (screenWidth <= 768) { // Check if the screen width is less than or equal to 768px (adjust this value as needed)
            if (chatUI.style.display === 'none' || chatUI.style.display === '') {
                chatUI.style.display = 'flex';
                friendList.style.display = 'none';
                this.component.classList.add('chat-open'); // Add a class to indicate chat is open
            } else {
                chatUI.style.display = 'none';
                friendList.style.display = 'block';
                this.component.classList.remove('chat-open'); // Remove the class when chat is closed
            }
        }
    }

    toggleChat() {

        const chatToggleButton = document.createElement('button');
        chatToggleButton.classList.add('chat-toggle-button');
        chatToggleButton.textContent = 'X';

        // Add a click event listener to toggle the chat UI
        chatToggleButton.addEventListener('click', () => {
            this.toggleChatDisplay()
        });

        // Append the chat toggle button to the friend controller
        this.component.appendChild(chatToggleButton);
    }

    // Initialize the controller (call this when the page loads)
    async init() {
        await this.loadFriends(); // Load friends from the server or mock data
        // Append the friend list to the placeholder
        this.appendFriendsToComponent();
        this.appendChatToComponent();
        this.toggleChat();
    }

    // Load friends from the service
    async loadFriends() {
        try {
            const friendService = new FriendService();
            this.friends = await friendService.getFriends();
        } catch (error) {
            console.error("FriendController - Load Friends error:", error);
        }
    }

    // Method to set a friend as active
    setActiveFriend(friend) {
        this.activeFriend = friend;
        // Update the UI to display the active friend's information and messages
        this.renderActiveFriend();
    }

    // Method to render the active friend's information and messages in the UI
    renderActiveFriend() {
        // Implement this method to update the UI with the active friend's details
        if (this.activeFriend) {
            // Create the chat UI for the active friend
            const chatUI = this.createChatUI();

            // Find the chat container and replace its content with the chat UI
            const chatContainer = document.querySelector(".chat-ui-container");
            if (chatContainer) {
                chatContainer.innerHTML = ""; // Clear existing content
                chatContainer.appendChild(chatUI); // Append the chat UI
            }
        } else {
            // No active friend is set, you can handle this case if needed
        }
    }

    // Method to update the last message with the active friend
    updateLastMessage(message) {
        // Implement this method to update the last message with the active friend
    }

    // Method to send a message to the active friend
    sendMessage(message) {
        // Implement this method to send a message to the active friend
    }

    // Method to create a placeholder for the friends component
    createFriendsPlaceholder() {
        // Create a div with the friend-controller ID
        const friendControllerDiv = document.createElement("div");
        friendControllerDiv.id = this.controllerId;

        return friendControllerDiv;
    }

    createChatPlaceholder() {
        // Create a div with the chat-controller ID
        const chatControllerDiv = document.createElement("div");
        chatControllerDiv.id = "chat-controller"; // Assuming you have a chat controller ID

        return chatControllerDiv;
    }
    // Method to append the friends list to the component
    appendFriendsToComponent() {
        if (this.component) {
            // Create a friends list container
            const friendsListContainer = this.createFriendsComponent();
            this.component.appendChild(friendsListContainer);
        }
    }
    // Method to create the friends component
    createFriendsComponent() {
        const friendsListContainer = document.createElement("div");
        friendsListContainer.classList.add("friends-list");

        // Loop through the friends and create a list item for each
        this.friends.forEach((friend) => {
            const friendListItem = document.createElement("div");
            friendListItem.classList.add("friend-list-item");

            // Create a circular status dot based on the friend's status
            const statusDot = document.createElement("div");
            statusDot.classList.add("status-dot", friend.status === "active" ? "active-status" : "inactive-status");

            // Create a profile picture element for the friend
            const profilePic = document.createElement("img");
            profilePic.src = friend.profilePic;
            profilePic.alt = friend.name;
            profilePic.classList.add("profile-pic");

            // Create a name element for the friend
            const nameElement = document.createElement("span");
            nameElement.textContent = friend.name;
            nameElement.classList.add("friend-name");

            // Create a last message element for the friend
            const lastMessageElement = document.createElement("span");
            lastMessageElement.textContent = friend.lastMessage;
            lastMessageElement.classList.add("friend-last-message");

            // Add a click event listener to set the friend as active when clicked
            friendListItem.addEventListener("click", () => {
                this.setActiveFriend(friend);
            });

            // Append the status dot, profile picture, name, and last message to the list item
            friendListItem.appendChild(statusDot);
            friendListItem.appendChild(profilePic);
            friendListItem.appendChild(nameElement);
            friendListItem.appendChild(lastMessageElement);

            friendListItem.addEventListener("click", () => {
                this.setActiveFriend(friend); // Trigger setActiveFriend when a friend is clicked
                this.toggleChatDisplay()
            });

            // Append the list item to the friends list container
            friendsListContainer.appendChild(friendListItem);
        });

        // Return the friends list container
        return friendsListContainer;
    }
    appendChatToComponent() {
        if (this.component) {
            // Create the chat UI for the active friend
            const chatUI = this.createChatUI();
            this.component.appendChild(chatUI);
        }
    }
    // Method to create the chat UI for the active friend
    // Method to create the chat UI for the active friend
    createChatUI() {
        // Create the chat UI container
        const chatUIContainer = document.createElement("div");
        chatUIContainer.classList.add("chat-ui-container");

        if (!this.activeFriend) {
            // Create a black container when no friend is selected
            const emptyChatContainer = document.createElement("div");
            emptyChatContainer.classList.add("empty-chat-container");

            // Create the chat component placeholder
            const chatComponentPlaceholder = document.createElement("div");
            chatComponentPlaceholder.classList.add("empty-chat-component");

            // Append the user and chat component placeholders to the empty chat container
            emptyChatContainer.appendChild(chatComponentPlaceholder);

            // Append the empty chat container to the chat UI container
            chatUIContainer.appendChild(emptyChatContainer);

            return chatUIContainer;
        }

        // Create the chat header
        const chatHeader = document.createElement("div");
        chatHeader.classList.add("chat-header");

        // Create the profile picture element
        const profilePic = document.createElement("img");
        profilePic.src = this.activeFriend.profilePic;
        profilePic.alt = this.activeFriend.name;
        profilePic.classList.add("profile-pic");

        // Create the friend name element
        const friendName = document.createElement("span");
        friendName.textContent = this.activeFriend.name;
        friendName.classList.add("friend-name");

        // Create the status dot element
        const statusDot = document.createElement("div");
        statusDot.classList.add("status-dot", this.activeFriend.status === "active" ? "active-status" : "inactive-status");

        // Append profile picture, friend name, and status dot to the header
        chatHeader.appendChild(profilePic);
        chatHeader.appendChild(friendName);
        chatHeader.appendChild(statusDot);

        // Create the chat messages container
        const chatMessagesContainer = document.createElement("ul");
        chatMessagesContainer.classList.add("chat-messages");

        // Create chat message items (you will need to populate these dynamically)
        // Example:
        const message1 = document.createElement("li");
        message1.textContent = "Hello!";
        message1.classList.add("chat-message");

        const message2 = document.createElement("li");
        message2.textContent = "Hi there!";
        message2.classList.add("chat-message");

        // Append chat message items to the chat messages container
        chatMessagesContainer.appendChild(message1);
        chatMessagesContainer.appendChild(message2);

        // Create the chat input container
        const chatInputContainer = document.createElement("div");
        chatInputContainer.classList.add("chat-input");

        // Create the message input field
        const messageInput = document.createElement("input");
        messageInput.type = "text";
        messageInput.placeholder = "Type a message...";
        messageInput.classList.add("message-input");

        // Create the send button
        const sendButton = document.createElement("button");
        sendButton.textContent = "Send";
        sendButton.classList.add("send-button");

        // Append message input field and send button to the chat input container
        chatInputContainer.appendChild(messageInput);
        chatInputContainer.appendChild(sendButton);

        // Create the attachment button
        const attachmentButton = document.createElement("input");
        attachmentButton.type = "file";
        attachmentButton.id = "attachment-input"; // Add an ID for styling and event handling
        attachmentButton.style.display = "none"; // Hide the input
        attachmentButton.accept = "image/*"; // Accept image files (you can adjust the accepted file types)

        // Create a label for the attachment button
        const attachmentLabel = document.createElement("label");
        attachmentLabel.htmlFor = "attachment-input";
        attachmentLabel.textContent = "Attach";

        // Handle file attachment when a file is selected
        attachmentButton.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                // Handle the uploaded file here (e.g., send it to the server, display it in the chat)
                // You can implement your logic to handle attachments.
                // Example: You can create a new message with the attachment and append it to the chat.
                const attachmentMessage = document.createElement("li");
                attachmentMessage.textContent = `Attachment: ${file.name}`;
                attachmentMessage.classList.add("chat-message");
                chatMessagesContainer.appendChild(attachmentMessage);

                // Clear the input value to allow attaching the same file again
                e.target.value = "";
            }
        });

        // Append the attachment button and label to the chat input container
        chatInputContainer.appendChild(attachmentButton);
        chatInputContainer.appendChild(attachmentLabel);


        // Append chat header, chat messages, and chat input to the chat UI container
        chatUIContainer.appendChild(chatHeader);
        chatUIContainer.appendChild(chatMessagesContainer);
        chatUIContainer.appendChild(chatInputContainer);

        return chatUIContainer;
    }

    // Method to get the friends container for rendering
    getFriendsContainer() {
        return this.component;
    }

    getChatContainer() {
        return this.chatComponent;
    }

}

export default FriendController;
