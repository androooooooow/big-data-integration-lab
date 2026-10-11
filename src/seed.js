require("dotenv").config();
const mongoose = require("mongoose");
const connectDatabase = require("./config/database");
const Transaction = require("./models/Transaction");

const seedDatabase = async () => {
  try {
    await connectDatabase();
    await Transaction.deleteMany({});

    const transactions = [
      {
        amount: 100,
        currency: "USD",
        status: "pending"
      },
      {
        amount: 250,
        currency: "EUR",
        status: "pending"
      },
      {
        amount: 50,
        currency: "PHP",
        status: "completed"
      },
      {
        amount: 500,
        currency: "USD",
        status: "pending"
      },
      {
        amount: 1250,
        currency: "PHP",
        status: "pending"
      },
      {
        amount: 75,
        currency: "EUR",
        status: "completed"
      },
      {
        amount: 800,
        currency: "USD",
        status: "pending"
      },
      {
        amount: 320,
        currency: "EUR",
        status: "pending"
      }
    ];

    const result = await Transaction.insertMany(transactions);
    console.log(`${result.length} transactions inserted`);

  } catch (error) {
    console.error("Seed error:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

seedDatabase();