    const express = require('express');
    const http = require('http');
    const socketIO = require('socket.io');
    const path = require('path');

    const app = express();
    const server = http.createServer(app);
    const io = socketIO(server);

    // Socket.io event handlers
    io.on('connection', socket => {
    console.log('A user connected');

    // Handle incoming messages
    socket.on('message', message => {
        console.log('Received message:', message);
        // Broadcast the message to all connected clients
        io.emit('message', message);
    });

    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
    });

    // Serve static files from the 'public' directory
    app.use(express.static(path.join(__dirname, 'public')));

    // Start the server
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });
