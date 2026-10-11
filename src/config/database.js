const path = require("node:path");
require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
  quiet: true,
});

const dns = require("node:dns");
const mongoose = require("mongoose");

const connectDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("Set MONGODB_URI in .env.");
  }

  const servers = (process.env.DNS_SERVERS || "")
    .split(",")
    .map((server) => server.trim())
    .filter(Boolean);

  if (servers.length) dns.setServers(servers);

  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  });
  console.log("MongoDB connected successfully");
};

module.exports = connectDatabase;
