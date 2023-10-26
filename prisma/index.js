const { PrismaClient } = require("@prisma/client");

const DataBaseInteraction = new PrismaClient();

module.exports = DataBaseInteraction;
