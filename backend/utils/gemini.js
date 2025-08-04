const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeResume = async (resumeText) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const prompt = `
        Analyze this resume and provide:
        1. ATS Score (0-100)
        2. Resume improvement suggestions (5-8 bullet points)
        
        Resume Text: ${resumeText}
        
        Please respond in this exact JSON format:
        {
            "atsScore": number,
            "suggestions": ["suggestion1", "suggestion2", ...]
        }
        `;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Try to parse JSON from the response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        
        // Fallback if JSON parsing fails
        return {
            atsScore: 75,
            suggestions: [
                "Add more quantifiable achievements",
                "Include relevant keywords for your industry",
                "Improve formatting and structure",
                "Add technical skills section",
                "Include action verbs in descriptions"
            ]
        };
    } catch (error) {
        console.error('Error analyzing resume:', error);
        throw error;
    }
};

const analyzeInterview = async (transcript) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const prompt = `
        Analyze this mock interview transcript and provide detailed feedback:
        
        Transcript: ${transcript}
        
        Please respond in this exact JSON format:
        {
            "strengths": ["strength1", "strength2", ...],
            "weaknesses": ["weakness1", "weakness2", ...],
            "improvements": ["improvement1", "improvement2", ...],
            "resources": ["resource1", "resource2", ...],
            "overallScore": number (0-100)
        }
        `;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Try to parse JSON from the response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        
        // Fallback if JSON parsing fails
        return {
            strengths: ["Good communication", "Clear responses"],
            weaknesses: ["Need more specific examples", "Could improve technical depth"],
            improvements: ["Practice STAR method", "Research company background"],
            resources: ["Leetcode for technical prep", "Glassdoor for company research"],
            overallScore: 70
        };
    } catch (error) {
        console.error('Error analyzing interview:', error);
        throw error;
    }
};

module.exports = {
    analyzeResume,
    analyzeInterview
};