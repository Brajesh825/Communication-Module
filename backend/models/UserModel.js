const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    profilePicture: String,
    bio: String,
});

UserSchema.methods.encryptPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

UserSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
