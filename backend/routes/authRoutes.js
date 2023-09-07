const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.post('/signup', AuthController.signUp);
router.post('/login', AuthController.login);
router.get('/login', (req, res) => {
    res.send('Login page'); // This should serve your actual login page
});
module.exports = router;
