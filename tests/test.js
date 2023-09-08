// Import required libraries and modules
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // Replace with the path to your Express app
// const User = require('../models/UserModel'); // Replace with the path to your User model

// Configure Chai and chai-http
chai.use(chaiHttp);
const expect = chai.expect;

// Create a MongoMemoryServer instance

// Mocha hooks for database setup and teardown
before(async () => {
    // this.timeout(5000); //
    // Create a MongoMemoryServer instance
    mongod = new MongoMemoryServer();

    // Start the server and get its URI
    await mongod.start();
    const uri = await mongod.getUri();

    // Disconnect from the existing MongoDB connection, if it exists
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }

    // Connect to the MongoMemoryServer
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

after(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

// // Test suite for user authentication
describe('User Authentication', () => {
    // Test case for user signup
    it('should sign up a new user', async () => {
        
        const newUser = {
            username: 'testuser',
            password: 'testpassword',
            email: 'test@example.com',
            name: 'Test User',
        };

        const res = await chai
            .request(app)
            .post('/auth/signup')
            .send(newUser);

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token');
    });

    // Test case for user login
    it('should log in an existing user', async () => {
        const credentials = {
            username: 'testuser',
            password: 'testpassword',
        };

        const res = await chai
            .request(app)
            .post('/auth/login')
            .send(credentials);

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token');
    });
});
