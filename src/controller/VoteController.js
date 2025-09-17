const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createVote = async (req, res) => {
  try {
    const { userId, optionId } = req.body;
    const vote = await prisma.vote.create({
      data: {
        user: { connect: { id: userId } },
        option: { connect: { id: optionId } }
      }
    });
    res.status(201).json(vote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllVotes = async (req, res) => {
  try {
    const votes = await prisma.vote.findMany();
    res.json(votes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVoteById = async (req, res) => {
  try {
    const vote = await prisma.vote.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!vote) return res.status(404).json({ error: "Vote not found" });
    res.json(vote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateVote = async (req, res) => {
  try {
    const { optionId } = req.body;
    const vote = await prisma.vote.update({
      where: { id: parseInt(req.params.id) },
      data: { option: { connect: { id: optionId } } }
    });
    res.json(vote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteVote = async (req, res) => {
  try {
    await prisma.vote.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ deleted: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
