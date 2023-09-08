const UserService = require('../services/UserService');

class UserController {
    static async getUserProfile(req, res) {
        const user = await UserService.getUserById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    }

    static async updateUserProfile(req, res) {
        const updatedUser = await UserService.updateUserProfile(req.params.id, req.body);
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    }
    static async searchUsers(req, res) {
        const query = req.query.query;
        const users = await UserService.searchUsers(query);
        if (users.length > 0) {
            res.json(users);
        } else {
            res.status(404).json({ error: 'No users found' });
        }
    }
}

module.exports = UserController;
