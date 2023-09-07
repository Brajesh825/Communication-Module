const AuthService = require('../services/AuthService');

class AuthController {
    static async signUp(req, res) {
        const { username, password } = req.body;
        const token = await AuthService.signUp(username, password);
        res.json({ token });
    }

    static async login(req, res) {
        const { username, password } = req.body;
        const token = await AuthService.login(username, password);
        if (token) {
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    }
}

module.exports = AuthController;
