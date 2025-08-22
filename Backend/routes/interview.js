const express = require('express');
const router = express.Router();
const { generateInterviewQuestions, analyzeInterview } = require('../utils/geminiService');

router.post('/questions', async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!role) {
      return res.status(400).json({ error: 'Role is required' });
    }

    const questions = await generateInterviewQuestions(role);
    res.json(questions);
  } catch (error) {
    console.error('Question generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/analyze', async (req, res) => {
  try {
    const { transcript } = req.body;
    
    if (!transcript) {
      return res.status(400).json({ error: 'Transcript is required' });
    }

    const analysis = await analyzeInterview(transcript);
    res.json(analysis);
  } catch (error) {
    console.error('Interview analysis error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;