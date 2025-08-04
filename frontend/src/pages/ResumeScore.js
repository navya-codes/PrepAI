import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { resumeAPI } from '../utils/api';
import ResumeUpload from '../components/ResumeUpload';

function ResumeScore() {
  const { state, dispatch } = useApp();
  const [error, setError] = useState('');

  const handleUpload = async (file) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    setError('');
    
    try {
      const result = await resumeAPI.analyze(file);
      dispatch({ type: 'SET_RESUME_ANALYSIS', payload: result.analysis });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze resume');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Resume ATS Score Checker
          </h1>
          <p className="text-lg text-gray-600">
            Upload your resume to get an instant ATS score and improvement suggestions
          </p>
        </div>

        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="ml-3 text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {!state.resumeAnalysis ? (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <ResumeUpload onUpload={handleUpload} loading={state.loading} />
          </div>
        ) : (
          <div className="space-y-8">
            {/* ATS Score */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your ATS Score</h2>
                <div className="relative inline-flex items-center justify-center w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-300"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="transparent"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={`${
                        state.resumeAnalysis.atsScore >= 80
                          ? 'text-green-500'
                          : state.resumeAnalysis.atsScore >= 60
                          ? 'text-yellow-500'
                          : 'text-red-500'
                      }`}
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="transparent"
                      strokeDasharray={`${state.resumeAnalysis.atsScore}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">
                      {state.resumeAnalysis.atsScore}
                    </span>
                  </div>
                </div>
                <p className="text-lg text-gray-600 mt-4">
                  {state.resumeAnalysis.atsScore >= 80
                    ? 'Excellent! Your resume is well-optimized for ATS systems.'
                    : state.resumeAnalysis.atsScore >= 60
                    ? 'Good score! Some improvements could help you stand out more.'
                    : 'Your resume needs improvement to pass through ATS systems effectively.'}
                </p>
              </div>
            </div>

            {/* Improvement Suggestions */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Improvement Suggestions
              </h2>
              <div className="space-y-4">
                {state.resumeAnalysis.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-primary-600 text-sm font-medium">
                        {index + 1}
                      </span>
                    </div>
                    <p className="ml-3 text-gray-700">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  dispatch({ type: 'SET_RESUME_ANALYSIS', payload: null });
                  setError('');
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
              >
                Upload Another Resume
              </button>
              <button
                onClick={() => window.location.href = '/interview'}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
              >
                Take Mock Interview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeScore;