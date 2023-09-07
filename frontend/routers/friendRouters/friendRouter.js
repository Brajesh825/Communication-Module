import { createNavbar } from '../../partials/navbar.js';

import CommunicationController from '../../controllers/communicationController/communicationController.js';

// Create an instance of the FriendController
const communicationController = new CommunicationController()

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
        communicationController.init().then(() => {
            renderFriendPage(communicationController.getCommunicationContainer());
            friendsListInitialized = true;
        });
    } else {
        // Friends list has already been initialized, just render it
        renderFriendPage(communicationController.getCommunicationContainer());
    }
});

export { renderFriendPage };
