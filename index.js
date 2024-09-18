// BACKEND
const express = require('express');
const { createServer } = require('http');
const { join } = require('path');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3000; // Käyttää julkaisualustan tarjoamaa porttia tai porttia 3000
const app = express();
const server = createServer(app);
const io = new Server(server);

// Lähetetään index.html
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

// Palvelimen vastaanottaessa viestin se lähettää(emit) sen kaikille clienteille heti
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

// Kuunnellaan porttia PORT=3000
server.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});