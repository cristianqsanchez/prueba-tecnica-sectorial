import mongoose from "mongoose";

mongoose.connect(
  'mongodb+srv://sectorial:sectorial@cluster0.zqfq7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Failed to connect to MongoDB:", err));
