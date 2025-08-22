const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { extractTextFromPDF } = require('../utils/pdfParser');
const { analyzeResume } = require('../utils/geminiService');

router.post('/analyze', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    // Extract text from PDF
    const resumeText = await extractTextFromPDF(req.file.buffer);
    
    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({ error: 'Could not extract text from PDF' });
    }

    // Analyze with Gemini
    const analysis = await analyzeResume(resumeText);
    
    res.json(analysis);
  } catch (error) {
    console.error('Resume analysis error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;