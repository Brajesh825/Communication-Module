const express = require('express');
const cors = require('cors');
const path = require('path');
const Database = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const friendRoutes = require('./routes/friendRoutes');
const http = require('http');
const WebSocket = require('./socket');

const app = express();
Database.connect();

app.use(cors());
app.use(express.json());

// Serve Static Files
app.use(express.static(path.join(__dirname, '../frontend/public')));

// API Routes
app.use('/auth', authRoutes);
app.use('/friends', friendRoutes);
app.use('/users', userRoutes);

// Frontend Routes
// The root route should direct to the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/login.html'));
});

// Signup route
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/signup.html'));
});

// Catch-all Route
// This is essential for SPA routing. It will always direct users to the main index.html file, where frontend routing (e.g., with Page.js) will take over.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

// WebSocket
const server = http.createServer(app);
WebSocket.configure(server);

// Start server
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
