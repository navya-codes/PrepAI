import React, { useState } from 'react';
import VoiceRecorder from '../components/VoiceRecorder';

const Interview = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);
  const [questions] = useState([
    'Tell me about yourself and your experience in software development.',
    'What programming languages are you most comfortable with?',
    'Describe a challenging project you worked on and how you overcame obstacles.',
    'How do you approach debugging a complex issue?',
    'What do you know about our company and why do you want to work here?'
  ]);

  const handleTranscriptChange = (transcript) => {
    // Update the response for the current question
    const newResponses = [...responses];
    newResponses[currentQuestion] = transcript;
    setResponses(newResponses);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restartInterview = () => {
    setCurrentQuestion(0);
    setResponses([]);
  };

  const completionPercentage = Math.round(((currentQuestion + 1) / questions.length) * 100);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Question {currentQuestion + 1} of {questions.length}</h1>
        <span style={{ color: '#666' }}>{completionPercentage}% Complete</span>
      </div>

      {/* Progress Bar */}
      <div style={{ 
        width: '100%', 
        height: '8px', 
        backgroundColor: '#f0f0f0', 
        borderRadius: '4px', 
        marginBottom: '30px' 
      }}>
        <div style={{
          width: `${completionPercentage}%`,
          height: '100%',
          backgroundColor: '#4285f4',
          borderRadius: '4px',
          transition: 'width 0.3s ease'
        }}></div>
      </div>

      {/* Question */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#666', marginBottom: '10px' }}>Interviewer asks:</h3>
        <h2 style={{ color: '#333', lineHeight: '1.4' }}>
          {questions[currentQuestion]}
        </h2>
      </div>

      {/* Voice Recorder */}
      <VoiceRecorder 
        onTranscriptChange={handleTranscriptChange}
        key={currentQuestion} // This will reset the component for each question
      />

      {/* Navigation Buttons */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: '1px solid #eee'
      }}>
        <button
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          style={{
            padding: '12px 20px',
            backgroundColor: currentQuestion === 0 ? '#f5f5f5' : '#6c757d',
            color: currentQuestion === 0 ? '#999' : 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          Previous
        </button>

        <button
          onClick={restartInterview}
          style={{
            padding: '12px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Restart Interview
        </button>

        <button
          onClick={nextQuestion}
          disabled={currentQuestion === questions.length - 1}
          style={{
            padding: '12px 20px',
            backgroundColor: currentQuestion === questions.length - 1 ? '#28a745' : '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          {currentQuestion === questions.length - 1 ? 'Finish Interview' : 'Next Question'}
        </button>
      </div>

      {/* Debug: Show all responses */}
      {responses.length > 0 && (
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h4>Your Responses:</h4>
          {responses.map((response, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <strong>Q{index + 1}:</strong> {response || 'No response yet'}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Interview;