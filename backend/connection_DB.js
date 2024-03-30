//
const mongoose = require("mongoose");

// connect to mongodb
const CONNECTdatabase = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connection established");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = CONNECTdatabase;
