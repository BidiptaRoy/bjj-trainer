const mongoose = require('mongoose');

const quizAnswerSchema = new mongoose.Schema({
  quizId: {
    type: String,
    required: true
  },
  questionId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Ensure a user can only have one answer per question
quizAnswerSchema.index({ questionId: 1, userName: 1 }, { unique: true });

module.exports = mongoose.model('QuizAnswer', quizAnswerSchema);
