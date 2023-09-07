const UserModel = require('../models/UserModel');
const JwtHelper = require('../utils/jwtHelper');

class AuthService {
    static async signUp(username, password) {
        const user = new UserModel({ username, password });
        user.password = await user.encryptPassword(password);
        await user.save();
        return JwtHelper.generateToken({ id: user._id });
    }

    static async login(username, password) {
        const user = await UserModel.findOne({ username });
        if (user && await user.validatePassword(password)) {
            return JwtHelper.generateToken({ id: user._id });
        }
        return null;
    }
}

module.exports = AuthService;
