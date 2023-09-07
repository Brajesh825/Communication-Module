import FriendController from '../../controllers/friendController/FriendControllers.js';
import { createNavbar } from '../../partials/navbar.js';

// Create an instance of the FriendController
const friendController = new FriendController();

// Flag to track if friends list has been initialized
let friendsListInitialized = false;

function renderFriendPage(content) {
    const appElement = document.getElementById("app");
    appElement.innerHTML = ""; // Clear the app div
    appElement.appendChild(createNavbar()); // Add the navbar
    appElement.appendChild(content);
}

// Define your friend routes using page.js
page('/friends', () => {
    if (!friendsListInitialized) {
        friendController.init().then(() => {
            renderFriendPage(friendController.getFriendsContainer());
            friendsListInitialized = true; // Set the flag to true
        });
    } else {
        // Friends list has already been initialized, just render it
        renderFriendPage(friendController.getFriendsContainer());
    }
});

export { renderFriendPage };
