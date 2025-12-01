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
    res.status(500).json({ error: error.message });
  }
});

// Post a comment
router.post('/', async (req, res) => {
  try {
    const { pageId, userName, text } = req.body;
    
    const comment = new Comment({
      pageId,
      userName,
      text
    });
    
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
