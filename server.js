import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/myDatabase", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

// Mongoose Schema
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
  },
  revenue: {
    type: Number,
    required: true,
  },
});

const Label = mongoose.model("Label", LabelSchema);

// POST route
app.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newLabel = new Label(data);
    const savedLabel = await newLabel.save();
    res.status(201).json(savedLabel);
  } catch (err) {
    console.log("We got some error", err);
    res.status(404).json(err);
  }
});

// GET route
app.get('/', async (req, res) => {
  try {
    const labels = await Label.find();
    res.json(labels);
  } catch (err) {
    console.log("We got some error", err);
    res.status(500).json(err);
  }
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
