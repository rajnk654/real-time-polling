// src/sockets/realtime.js
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

function setupSocketIo(server) {
  const io = require('socket.io')(server, { cors: { origin: "*" } });
  io.on('connection', (socket) => {
    socket.on('joinPoll', pollId => { socket.join(`poll_${pollId}`); });
    socket.on('leavePoll', pollId => { socket.leave(`poll_${pollId}`); });
  });

  // Broadcast updated poll vote counts
  global.emitPollUpdate = async function (pollId) {
    const poll = await prisma.poll.findUnique({
      where: { id: pollId },
      include: { options: { include: { votes: true } } },
    });
    io.to(`poll_${pollId}`).emit('pollUpdate', poll);
  };
}
module.exports = setupSocketIo;
