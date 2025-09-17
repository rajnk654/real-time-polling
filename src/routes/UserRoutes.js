// src/routes/user.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { name, email, passwordHash } = req.body;
  const user = await prisma.user.create({ data: { name, email, passwordHash } });
  res.json(user);
});

router.get('/:id', async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) } });
  res.json(user);
});
module.exports = router;
