// src/routes/vote.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { optionId, userId } = req.body;
  const vote = await prisma.vote.create({
    data: {
      user: { connect: { id: userId } },
      option: { connect: { id: optionId } },
    },
    include: { option: { include: { poll: true } } },
  });
  // Signal: pass update job to WebSocket logic (see below)
  global.emitPollUpdate(vote.option.poll.id);
  res.json(vote);
});
module.exports = router;
