const fs = require("fs");
const path = require("path");
const Transaction = require("../models/Transaction");

const runETL = async () => {
  console.log("\n==============================");
  console.log("STARTING ETL PIPELINE");
  console.log("==============================");

  // ==========================================
  // EXTRACT
  // ==========================================
  console.log("\n[EXTRACT]");
  
  const transactions = await Transaction.find({ status: "pending" }).lean();
  console.log(`Extracted ${transactions.length} pending transactions`);

  // ==========================================
  // TRANSFORM
  // ==========================================
  console.log("\n[TRANSFORM]");

  const transformedData = transactions.map((transaction) => {
    const amount = Number(transaction.amount);
    const taxAmount = amount * 0.12;
    const totalValue = amount * 1.12;

    return {
      transaction_id: transaction._id.toString(),
      currency: transaction.currency.toUpperCase(),
      amount: amount,
      tax_amount: Number(taxAmount.toFixed(2)),
      total_value: Number(totalValue.toFixed(2)),
      processed_at: new Date().toISOString(),
      agent_id: "MONGOOSE_ETL_01"
    };
  });

  console.table(transformedData);

  // ==========================================
  // LOAD
  // ==========================================
  console.log("\n[LOAD]");

  // NOTE: Ensure your folder structure matches this path logic
  const outputDirectory = path.join(__dirname, "../../output");

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  const outputFile = path.join(outputDirectory, "analytics_ready.json");

  fs.writeFileSync(outputFile, JSON.stringify(transformedData, null, 2));
  console.log(`Analytics-ready dataset saved to: ${outputFile}`);

  console.log("\n==============================");
  console.log("ETL PIPELINE COMPLETED");
  console.log("==============================\n");

  return transformedData;
};

module.exports = runETL;