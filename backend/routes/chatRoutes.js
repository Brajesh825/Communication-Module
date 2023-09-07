const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/ChatController');

// Fetch chat history between two users
router.get('/:userId1/with/:userId2', ChatController.getMessagesBetween);

// ... Add any other chat-related routes if necessary ...

module.exports = router;
