// src/index.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', require('./src/routes/UserRoutes'));
app.use('/api/polls', require('./src/routes/PollRoutes'));
app.use('/api/votes', require('./src/routes/VoteRoutes'));

const server = http.createServer(app);
require('./src/sockets/Socket')(server);

// Start the app
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
