// db.js

const mongoose = require("mongoose");
const logger = require("./logger"); // Adjust the path if needed

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Optional: Increase the timeout to 30s
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    logger.error("MongoDB connection error:", err); // Assuming you have a logger
    process.exit(1);
  }
};

module.exports = connectDB;
