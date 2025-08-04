const express = require('express');
const { analyzeInterview } = require('../utils/gemini');

const router = express.Router();

// Get interview questions based on role
router.post('/questions', (req, res) => {
    const { role } = req.body;
    
    const questionSets = {
        'software-engineer': [
            "Tell me about yourself and your background in software engineering.",
            "Describe a challenging technical problem you solved recently.",
            "How do you approach debugging complex issues?",
            "What's your experience with version control systems like Git?",
            "How do you stay updated with new technologies?"
        ],
        'data-scientist': [
            "Tell me about yourself and your data science background.",
            "Explain a machine learning project you've worked on.",
            "How do you handle missing data in datasets?",
            "What's your experience with Python and R?",
            "How do you validate the accuracy of your models?"
        ],
        'product-manager': [
            "Tell me about yourself and your product management experience.",
            "How do you prioritize features in a product roadmap?",
            "Describe a time you had to make a difficult product decision.",
            "How do you gather and analyze user feedback?",
            "What metrics do you use to measure product success?"
        ],
        'marketing': [
            "Tell me about yourself and your marketing background.",
            "How do you develop a marketing strategy for a new product?",
            "Describe a successful marketing campaign you led.",
            "How do you measure the ROI of marketing activities?",
            "What's your experience with digital marketing tools?"
        ],
        'default': [
            "Tell me about yourself.",
            "Why are you interested in this position?",
            "What are your greatest strengths?",
            "Describe a challenge you overcame.",
            "Where do you see yourself in 5 years?"
        ]
    };

    const questions = questionSets[role] || questionSets['default'];
    
    res.json({
        success: true,
        questions: questions
    });
});

// Analyze interview responses
router.post('/analyze', async (req, res) => {
    try {
        const { transcript } = req.body;
        
        if (!transcript || transcript.trim().length === 0) {
            return res.status(400).json({ error: 'No transcript provided' });
        }

        const analysis = await analyzeInterview(transcript);

        res.json({
            success: true,
            analysis: analysis
        });

    } catch (error) {
        console.error('Interview analysis error:', error);
        res.status(500).json({ 
            error: 'Failed to analyze interview',
            details: error.message 
        });
    }
});

module.exports = router;