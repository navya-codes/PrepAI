const express = require('express');
const cors = require('cors');
const path = require('path');
const os = require('os');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'PrepAI Backend Server Running!' });
});

// Interview questions endpoint
app.post('/api/interview/questions', (req, res) => {
  try {
    const { role, name } = req.body;
    
    // Sample questions based on role (you can enhance this with AI later)
    const questionsByRole = {
      'software developer': [
        'Tell me about yourself and your experience in software development.',
        'What programming languages are you most comfortable with?',
        'Describe a challenging project you worked on and how you overcame obstacles.',
        'How do you approach debugging a complex issue?',
        'What do you know about our company and why do you want to work here?'
      ],
      'data scientist': [
        'Tell me about your background in data science.',
        'What machine learning algorithms are you familiar with?',
        'How do you handle missing data in a dataset?',
        'Describe a data science project you\'re proud of.',
        'How do you communicate complex findings to non-technical stakeholders?'
      ],
      'product manager': [
        'Tell me about your product management experience.',
        'How do you prioritize features in a product roadmap?',
        'Describe a time when you had to make a difficult product decision.',
        'How do you gather and analyze user feedback?',
        'How do you work with engineering and design teams?'
      ],
      'default': [
        'Tell me about yourself.',
        'Why are you interested in this position?',
        'What are your greatest strengths?',
        'Describe a challenge you faced and how you overcame it.',
        'Where do you see yourself in 5 years?'
      ]
    };

    const roleKey = role ? role.toLowerCase() : 'default';
    const questions = questionsByRole[roleKey] || questionsByRole['default'];

    res.json({
      success: true,
      questions: questions,
      candidateName: name || 'Candidate',
      role: role || 'General Position'
    });

  } catch (error) {
    console.error('Error generating questions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate questions'
    });
  }
});

// Start server
app.listen(PORT, () => {
  const networkInterfaces = os.networkInterfaces();
  let localIP = 'localhost';
  
  // Find the local IP address
  Object.keys(networkInterfaces).forEach(interfaceName => {
    const interfaces = networkInterfaces[interfaceName];
    interfaces.forEach(iface => {
      if (iface.family === 'IPv4' && !iface.internal) {
        localIP = iface.address;
      }
    });
  });
  
  console.log('\n🚀 PrepAI Backend Server is running!');
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌐 Local:   http://localhost:${PORT}`);
  console.log(`🌐 Network: http://${localIP}:${PORT}`);
  console.log('\n✨ Click any link above to open in browser\n');
});