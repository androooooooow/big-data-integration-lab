const mongoose = require("mongoose");
const connectDatabase = require("./src/config/database");
const Transaction = require("./src/models/Transaction");
async function run() {
  try {
    await connectDatabase();
    const transactions = [
      { amount: 1750, currency: "PHP", status: "pending", payment_method: "gcash" },
      { amount: 2300, currency: "PHP", status: "pending", payment_method: "bank" },
      { amount: 1200, currency: "PHP", status: "pending", payment_method: "cash" },
      { amount: 2000, currency: "PHP", status: "pending", payment_method: "credit_card" },
      { amount: 1000, currency: "PHP", status: "pending", payment_method: "gcash" }
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