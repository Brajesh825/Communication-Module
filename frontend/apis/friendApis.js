class FriendAPI {
    // Simulated data for demonstration purposes (replace with actual API calls)
    static async getFriends() {
        return [
            {
                id: 1,
                name: "Friend 1",
                profilePic: "https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg",
                publicKey: "publicKey1",
                lastMessage: "hii",
                status: "active"
            },
            {
                id: 2,
                name: "Friend 2",
                profilePic: "https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg",
                publicKey: "publicKey2",
                lastMessage: "hii",
                status: "InActive"
            },
            // Add more friends as needed
        ];
    }
}

export default FriendAPI;
