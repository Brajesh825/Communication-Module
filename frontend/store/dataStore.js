class DataStore {
    constructor() {
        this.friends = []; // Array to store friend objects
        this.activeFriend = null; // Currently active friend
    }

    // Method to search for friends based on a query
    searchFriends(query) {
        query = query.toLowerCase(); // Convert the query to lowercase for case-insensitive search
        return this.friends.filter((friend) => {
            // Customize the search criteria based on your needs
            // Here, we're searching by friend name
            return friend.name.toLowerCase().includes(query);
        });
    }

    // Method to set the active friend
    setActiveFriend(friend) {
        this.activeFriend = friend;
    }

    // Method to get the active friend
    getActiveFriend() {
        return this.activeFriend;
    }

    // Method to set the friends list
    setFriends(friends) {
        this.friends = friends;
    }

    // Method to add a new friend
    addFriend(friend) {
        this.friends.push(friend);
    }

    // Method to remove a friend
    removeFriend(friendId) {
        this.friends = this.friends.filter((friend) => friend.id !== friendId);
    }

    // Method to update a friend's details
    updateFriend(friendId, updatedFriendData) {
        this.friends = this.friends.map((friend) => {
            if (friend.id === friendId) {
                return { ...friend, ...updatedFriendData };
            }
            return friend;
        });
    }

    // Method to send a message to the active friend
    sendMessage(message) {
        if (this.activeFriend) {
            // Check if there's an active friend
            if (!this.activeFriend.messages) {
                this.activeFriend.messages = []; // Initialize an empty array for messages
            }
            this.activeFriend.messages.push(message); // Add the message to the active friend's messages
        }
    }

    // Method to add a message to a specific friend
    addMessage(friendId, message) {
        const friend = this.friends.find((friend) => friend.id === friendId);
        if (friend) {
            if (!friend.messages) {
                friend.messages = [];
            }
            friend.messages.push(message);
        }
    }

    // Method to get messages from the active friend
    getMessages() {
        return this.activeFriend ? this.activeFriend.messages || [] : [];
    }

    // Method to update the last message with the active friend
    updateLastMessage(message) {
        if (this.activeFriend) {
            this.activeFriend.lastMessage = message;
        }
    }
}

export default DataStore;