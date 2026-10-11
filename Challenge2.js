const mongoose = require("mongoose");
const connectDatabase = require("./src/config/database");
const Transaction = require("./src/models/Transaction");
async function run() {
  try {
    await connectDatabase();
    await Transaction.create({
      amount: -500,
      currency: "PHP",
      status: "pending"
    });
    console.log("Transaction inserted successfully.");
  } catch (error) {
    console.log("Expected validation error:");
    console.log(error.message);
  } finally {
    await mongoose.connection.close();
  }
}
run();