import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
if (!process.env.MONGO_POSTURL) {
  console.error("❌ MONGO_POSTURL not set in environment variables.");
  process.exit(1);
}

const connectDB = async () => {
  try {
    console.log("🌍 Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGO_POSTURL);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

// Mongoose Schema
const LabelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  salary: { type: Number, default: 0 },
  revenue: { type: Number, required: true },
});

const Label = mongoose.model("Label", LabelSchema);

// Routes
app.post('/', async (req, res) => {
  try {
    const newLabel = new Label(req.body);
    const savedLabel = await newLabel.save();
    res.status(201).json(savedLabel);
  } catch (err) {
    console.error("❌ Error saving label:", err.message);
    res.status(500).json({ error: "Failed to save label" });
  }
});

app.get('/', async (req, res) => {
  try {
    const labels = await Label.find();
    res.status(200).json(labels);
  } catch (err) {
    console.error("❌ Error fetching labels:", err.message);
    res.status(500).json({ error: "Failed to fetch labels" });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
