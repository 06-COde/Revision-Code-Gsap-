import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); // Optional: Allow cross-origin requests
app.use(express.json()); // Parse JSON requests

// Debug log to confirm environment variable
if (!process.env.MONGO_POSTURL) {
  console.error("❌ MONGO_POSTURL not set in environment variables.");
  process.exit(1);
}

// MongoDB connection
const connectDB = async () => {
  try {
    console.log("🌍 Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGO_POSTURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

// Schema and Model
const LabelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    default: 0,
  },
  revenue: {
    type: Number,
    required: true,
  },
});

const Label = mongoose.model("Label", LabelSchema);

// Routes

// POST - Create a new label
app.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newLabel = new Label(data);
    const savedLabel = await newLabel.save();
    res.status(201).json(savedLabel);
  } catch (err) {
    console.error("❌ Error saving label:", err.message);
    res.status(500).json({ error: "Failed to save label" });
  }
});

// GET - Fetch all labels
app.get('/', async (req, res) => {
  try {
    const labels = await Label.find();
    res.status(200).json(labels);
  } catch (err) {
    console.error("❌ Error fetching labels:", err.message);
    res.status(500).json({ error: "Failed to fetch labels" });
  }
});

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
