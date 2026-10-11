const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
    },
    status: {
      type: String,
      required: true,
      enum: [
        "pending", 
        "completed", 
        "cancelled"
      ]
    }
  },
  {
    timestamps: true
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;