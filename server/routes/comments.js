const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Get comments for a page
router.get('/:pageId', async (req, res) => {
  try {
    const comments = await Comment.find({ pageId: req.params.pageId })
      .sort({ timestamp: -1 });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: error.message });
  }
});

// Post a comment
router.post('/', async (req, res) => {
  try {
    const { pageId, userName, text } = req.body;
    
    if (!pageId || !userName || !text) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const comment = new Comment({
      pageId,
      userName,
      text
    });
    
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error saving comment:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
