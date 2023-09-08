const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/ChatController');

const chatController = new ChatController();

// Send chat message
router.post('/send', async (req, res) => {
    chatController.sendMessage(req, res);
});

// Edit chat message
router.put('/edit/:messageId', async (req, res) => {
    chatController.editMessage(req, res);
});

module.exports = router;