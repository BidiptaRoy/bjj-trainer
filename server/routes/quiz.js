const express = require('express');
const router = express.Router();
const QuizAnswer = require('../models/Quiz');

// Get quiz results for a question
router.get('/:quizId/results/:questionId', async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    const answers = await QuizAnswer.find({ quizId, questionId });
    
    // Group by answer choice
    const results = {};
    answers.forEach(answer => {
      if (!results[answer.answer]) {
        results[answer.answer] = [];
      }
      results[answer.answer].push(answer.userName);
    });
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit or update quiz answer
router.post('/answer', async (req, res) => {
  try {
    const { quizId, questionId, userName, answer } = req.body;
    
    // Update if exists, create if not
    const result = await QuizAnswer.findOneAndUpdate(
      { questionId, userName },
      { quizId, questionId, userName, answer, timestamp: new Date() },
      { upsert: true, new: true }
    );
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
