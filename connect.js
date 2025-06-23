const mongoose = require("mongoose");

async function connectToMongoDB(url) {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = {
    connectToMongoDB,
};