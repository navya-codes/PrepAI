import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, Mic, ArrowRight, CheckCircle } from 'lucide-react';
import { generateQuestions, analyzeInterview } from '../utils/api';
import VoiceRecorder from '../components/VoiceRecorder';
import LoadingSpinner from '../components/LoadingSpinner';

const Interview = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('details'); // details, interview, completed
  const [formData, setFormData] = useState({
    name: '',
    role: ''
  });
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role.trim()) {
      setError('Please enter your target role');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await generateQuestions(formData.role);
      setQuestions(result.questions);
      setStep('interview');
    } catch (err) {
      setError('Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerComplete = (transcript) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: transcript
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsListening(false);
    } else {
      handleInterviewComplete();
    }
  };

  const handleInterviewComplete = async () => {
    setLoading(true);
    
    try {
      // Create transcript
      const transcript = questions.map((question, index) => 
        `Q${index + 1}: ${question}\nA${index + 1}: ${answers[index] || 'No response'}`
      ).join('\n\n');

      const analysis = await analyzeInterview(transcript);
      
      // Store results in localStorage for dashboard
      localStorage.setItem('interviewResults', JSON.stringify({
        ...analysis,
        candidateName: formData.name,
        role: formData.role,
        completedAt: new Date().toISOString()
      }));

      navigate('/dashboard');
    } catch (err) {
      setError('Failed to analyze interview. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card text-center py-12">
          <LoadingSpinner text={
            step === 'details' ? 'Generating interview questions...' : 'Analyzing your interview...'
          } />
        </div>
      </div>
    );
  }

  // Details Form
  if (step === 'details') {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">
            Mock{' '}
            <span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
              Interview
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Let's start with some basic information
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="card space-y-6">
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2 text-white font-semibold mb-2">
                <User className="h-5 w-5 text-primary-500" />
                <span>Name (Optional)</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-white font-semibold mb-2">
                <Briefcase className="h-5 w-5 text-primary-500" />
                <span>Target Role *</span>
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                placeholder="e.g., Software Engineer, Product Manager, Data Scientist"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 bg-red-500/10 p-4 rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            <span>Start Interview</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>
      </div>
    );
  }

  // Interview Phase
  if (step === 'interview') {
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">
            Interview in Progress
          </h1>
          <div className="flex items-center justify-center space-x-4 text-gray-400">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <div className="w-32 bg-gray-800 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="card space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-primary-500">Question {currentQuestionIndex + 1}</h2>
            <p className="text-lg text-white leading-relaxed">{currentQuestion}</p>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Your Answer</h3>
              
              <VoiceRecorder
                onTranscript={handleAnswerComplete}
                isListening={isListening}
                onToggleListening={() => setIsListening(!isListening)}
              />

              {answers[currentQuestionIndex] && (
                <button
                  onClick={handleNextQuestion}
                  className="btn-primary flex items-center space-x-2"
                >
                  <span>
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Interview'}
                  </span>
                  {currentQuestionIndex < questions.length - 1 ? (
                    <ArrowRight className="h-5 w-5" />
                  ) : (
                    <CheckCircle className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="card">
            <div className="text-red-500 bg-red-500/10 p-4 rounded-xl">
              {error}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default Interview;