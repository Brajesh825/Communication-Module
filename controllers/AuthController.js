const AuthService = require('../services/AuthService')

const authService = new AuthService()
class AuthController {
    async signUp(req, res) {
        try {
            const { username, password, email, name } = req.body;
            const token = await authService.signUp(username, password, email, name);
            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const token = await authService.login(username, password);
            if (token) {
                res.json({ token });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = AuthController;