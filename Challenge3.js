const mongoose = require("mongoose");
const connectDatabase = require("./src/config/database");
const Transaction = require("./src/models/Transaction");

const run = async () => {
  try {
    await connectDatabase();

    await Transaction.create({
      amount: 500,
      currency: "PHP",
      status: "processing"   // not in the enum
    });

    console.log("Inserted (this should NOT print)");
  } catch (error) {
    console.log("Expected validation error:");
    console.log(error.message);
  } finally {
    await mongoose.connection.close();
  }
};

run();