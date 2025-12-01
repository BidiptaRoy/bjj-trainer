const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bjj-trainer';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
const commentRoutes = require('./routes/comments');
const quizRoutes = require('./routes/quiz');

app.use('/api/comments', commentRoutes);
app.use('/api/quiz', quizRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'BJJ Trainer API is running!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
