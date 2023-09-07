const UserModel = require('../models/UserModel');

class UserService {
    static async getUserById(id) {
        return await UserModel.findById(id);
    }

    static async updateUserProfile(id, profileData) {
        return await UserModel.findByIdAndUpdate(id, profileData, { new: true });
    }
    static async searchUsers(query) {
        return await UserModel.find({ username: new RegExp(query, 'i') });
    }

}

module.exports = UserService;
