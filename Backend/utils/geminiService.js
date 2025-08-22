const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Resume Analysis
const analyzeResume = async (resumeText) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    const prompt = `
    Analyze this resume and provide:
    1. ATS Score (0-100)
    2. Improvement suggestions (5-7 bullet points)

    Resume Text:
    ${resumeText}

    Please respond in this exact JSON format:
    {
      "atsScore": number,
      "suggestions": [
        "suggestion 1",
        "suggestion 2",
        ...
      ]
    }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error('Invalid response format');
  } catch (error) {
    throw new Error('Failed to analyze resume: ' + error.message);
  }
};

// ✅ Interview Transcript Analysis
const analyzeInterview = async (transcript) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `
    Analyze this mock interview transcript and provide detailed feedback:

    Transcript:
    ${transcript}

    Please respond in this exact JSON format:
    {
      "summary": "Brief performance summary",
      "strengths": [
        "strength 1",
        "strength 2",
        ...
      ],
      "weaknesses": [
        "weakness 1",
        "weakness 2",
        ...
      ],
      "improvements": [
        "improvement 1",
        "improvement 2",
        ...
      ],
      "resources": [
        "resource 1",
        "resource 2",
        ...
      ]
    }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error('Invalid response format');
  } catch (error) {
    throw new Error('Failed to analyze interview: ' + error.message);
  }
};

// ✅ Question Generation
const generateInterviewQuestions = async (role) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `
    Generate 5 interview questions for a ${role} position. 
    Mix behavioral, technical, and situational questions.

    Please respond in this exact JSON format:
    {
      "questions": [
        "question 1",
        "question 2",
        ...
      ]
    }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error('Invalid response format');
  } catch (error) {
    throw new Error('Failed to generate questions: ' + error.message);
  }
};

module.exports = {
  analyzeResume,
  analyzeInterview,
  generateInterviewQuestions
};
