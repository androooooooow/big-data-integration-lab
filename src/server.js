const express = require("express");
const connectDatabase = require("./config/database");
const Transaction = require("./models/Transaction");
const runETL = require("./services/etlService"); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Big Data Integration API is running");
});

app.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json({ success: true, count: transactions.length, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

app.post("/transactions", async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.post("/run-etl", async (req, res) => {
  try {
    const transformedData = await runETL();
    res.status(200).json({ 
      success: true, 
      message: "ETL pipeline executed successfully", 
      count: transformedData.length,
      data: transformedData 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const startServer = async () => {
  await connectDatabase();
  
  // Optional: If you want the ETL to run automatically on server boot, uncomment the line below:
  // await runETL();

  const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  
  server.on("error", (error) => {
    console.error("Server error:", error.message);
    process.exit(1);
  });
};

startServer().catch((error) => {
  console.error("MongoDB connection error:", error.message);
  process.exit(1);
});