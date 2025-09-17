const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createPollOption = async (req, res) => {
  try {
    const { text, pollId } = req.body;
    const option = await prisma.pollOption.create({
      data: { text, poll: { connect: { id: pollId } } }
    });
    res.status(201).json(option);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPollOptions = async (req, res) => {
  try {
    const options = await prisma.pollOption.findMany();
    res.json(options);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPollOptionById = async (req, res) => {
  try {
    const option = await prisma.pollOption.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!option) return res.status(404).json({ error: "Option not found" });
    res.json(option);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePollOption = async (req, res) => {
  try {
    const { text } = req.body;
    const option = await prisma.pollOption.update({
      where: { id: parseInt(req.params.id) },
      data: { text }
    });
    res.json(option);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePollOption = async (req, res) => {
  try {
    await prisma.pollOption.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ deleted: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
