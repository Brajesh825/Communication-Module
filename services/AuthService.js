const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

class AuthService {
    async signUp(username, password, email, name) {
        try {
            // Check if a user with the same username or email already exists
            const existingUser = await User.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                throw new Error('Username or email already exists');
            }

            // Create a new user
            const newUser = new User({
                username,
                password, // No need to hash the password again, as it's already handled in the UserSchema
                email,
                name,
            });

            newUser.generateRSAKeys()

            // Save the user to the database
            await newUser.save();

            // Generate a JWT token
            const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', {
                expiresIn: '10h',
            });

            return token;
        } catch (error) {
            throw error;
        }
    }

    async login(username, password) {
        try {
            // Find the user by username
            const user = await User.findOne({ username });

            // If the user doesn't exist, return null
            if (!user) {
                return null;
            }

            // Check if the provided password matches the stored hashed password using validatePassword method
            const isPasswordValid = await user.validatePassword(password);

            if (!isPasswordValid) {
                return null; // Invalid password
            }

            // Generate a JWT token
            const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
                expiresIn: '1h', // You can customize the token expiration time
            });

            return token;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthService;
