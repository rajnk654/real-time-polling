const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.createPoll = async (req, res) => {
  try {
    const { question, isPublished, creatorId, options } = req.body;
    const poll = await prisma.poll.create({
      data: {
        question,
        isPublished,
        creator: { connect: { id: creatorId } },
        options: { create: options.map(text => ({ text })) }
      },
      include: { options: true }
    });
    res.status(201).json(poll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPolls = async (req, res) => {
  try {
    const polls = await prisma.poll.findMany({
      include: { creator: true, options: { include: { votes: true } } }
    });
    res.json(polls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPollById = async (req, res) => {
  try {
    const poll = await prisma.poll.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { creator: true, options: { include: { votes: true } } }
    });
    if (!poll) return res.status(404).json({ error: "Poll not found" });
    res.json(poll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePoll = async (req, res) => {
  try {
    const { question, isPublished } = req.body;
    const poll = await prisma.poll.update({
      where: { id: parseInt(req.params.id) },
      data: { question, isPublished },
      include: { options: true }
    });
    res.json(poll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePoll = async (req, res) => {
  try {
    await prisma.poll.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ deleted: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
