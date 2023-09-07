import AuthAPI from '../apis/authApis.js';

class AuthService {
    constructor() {
        this.authAPI = new AuthAPI();
    }

    async login(username, password) {
        try {
            // Call the login method from the AuthAPI
            const response = await this.authAPI.login(username, password);
            // Handle the login response as needed
            return response;
        } catch (error) {
            console.error("AuthService - Login error:", error);
            throw error; // Propagate the error
        }
    }

    async signup(username, password) {
        try {
            // Call the signup method from the AuthAPI
            const response = await this.authAPI.signup(username, password);
            // Handle the signup response as needed
            return response;
        } catch (error) {
            console.error("AuthService - Signup error:", error);
            throw error; // Propagate the error
        }
    }

    async logout() {
        try {
            // Call the logout method from the AuthAPI
            const response = await this.authAPI.logout();
            // Handle the logout response as needed
            return response;
        } catch (error) {
            console.error("AuthService - Logout error:", error);
            throw error; // Propagate the error
        }
    }

    // Other authentication-related methods can be added here
}

export default AuthService;
