import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// App Routes
import NotesRoutes from "./src/modules/users/notes.routes.js";

const app = express();
const port = 5000;

// Parse data for POST, PUT, PATCH
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://kamrankhizri4749:125@cluster0.3jksbr0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// Route Middleware
app.use("/notes", NotesRoutes);

// Start the server
app.listen(port, () => {
  console.log(`✅ Server Is Running on port http://localhost:${port} 🚀`);
});
