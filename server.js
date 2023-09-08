const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const attachWebSocketInstance = require('./middleware/websocketMiddleware');
const Database = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const friendRoutes = require('./routes/friendRoutes');

// Connect to the database
Database.connect();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Middleware
app.use(cors());
app.use(attachWebSocketInstance(io));
app.use(express.json());

// Serve Static Files
app.use(express.static(path.join(__dirname, './frontend/')));

// API Routes
app.use('/auth', authRoutes);
app.use('/friends', friendRoutes);
app.use('/users', userRoutes);

// Frontend Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/public/login.html'));
});

// Catch-all Route for SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/index.html'));
});

// Start server
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


module.exports = app