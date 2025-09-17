const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createUser = async (req, res) => {
  try {
    const { name, email, passwordHash } = req.body;
    const user = await prisma.user.create({ data: { name, email, passwordHash } });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({ select: { id: true, name: true, email: true } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
      select: { id: true, name: true, email: true }
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { name, email },
      select: { id: true, name: true, email: true }
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ deleted: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
