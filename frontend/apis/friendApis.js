class FriendAPI {
    // Simulated data for demonstration purposes (replace with actual API calls)
    static async getFriends() {
        return [
            {
                id: 1,
                name: "Brajesh Mishra",
                profilePic: "https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg",
                publicKey: "publicKey1",
                lastMessage: "",
                status: "active"
            },
            {
                id: 2,
                name: "Deepak Joshi",
                profilePic: "https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg",
                publicKey: "publicKey2",
                lastMessage: "",
                status: "InActive"
            },
            // Add more friends as needed
        ];
    }
}

export default FriendAPI;
