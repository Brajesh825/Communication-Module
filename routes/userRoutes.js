const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/:id', UserController.getUserProfile);
router.put('/:id', UserController.updateUserProfile);
router.get('/search', UserController.searchUsers);

module.exports = router;
