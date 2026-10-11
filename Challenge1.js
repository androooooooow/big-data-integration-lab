const mongoose = require("mongoose");
const connectDatabase = require("./src/config/database");
const Transaction = require("./src/models/Transaction");
async function run() {
  try {
    await connectDatabase();
    const transactions = [
      { amount: 1750, currency: "PHP", status: "pending" },
      { amount: 2300, currency: "PHP", status: "pending" },
      { amount: 1200, currency: "PHP", status: "pending" },
      { amount: 2000, currency: "PHP", status: "pending" },
      { amount: 1000, currency: "PHP", status: "pending" }
    ];
    const result = await Transaction.create(transactions);
    console.log("Inserted transactions:", result.length);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await mongoose.connection.close();
  }
}
run();

