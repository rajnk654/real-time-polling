// src/routes/poll.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// Create poll with options
router.post('/', async (req, res) => {
  const { question, options, creatorId, isPublished } = req.body;
  const poll = await prisma.poll.create({
    data: {
      question,
      isPublished,
      creator: { connect: { id: creatorId } },
      options: { create: options.map(text => ({ text })) },
    },
    include: { options: true },
  });
  res.json(poll);
});

// Get poll(s)
router.get('/:id', async (req, res) => {
  const poll = await prisma.poll.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { options: { include: { votes: true } }, creator: true },
  });
  res.json(poll);
});
module.exports = router;
