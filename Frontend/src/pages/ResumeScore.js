import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { analyzeResume } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const ResumeScore = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      if (uploadedFile.type !== 'application/pdf') {
        setError('Please upload only PDF files');
        return;
      }
      if (uploadedFile.size > 10 * 1024 * 1024) {
        setError('File size should be less than 10MB');
        return;
      }
      setFile(uploadedFile);
      setError('');
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);
    setError('');
    
    try {
      const result = await analyzeResume(file);
      setAnalysis(result);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Resume{' '}
          <span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
            Score Analyzer
          </span>
        </h1>
        <p className="text-xl text-gray-400">
          Upload your resume to get an instant ATS score and improvement suggestions
        </p>
      </div>

      {/* Upload Section */}
      <div className="card space-y-6">
        <div className="text-center">
          <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 hover:border-primary-500 transition-colors">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="resume-upload"
            />
            <label htmlFor="resume-upload" className="cursor-pointer space-y-4 block">
              <Upload className="h-16 w-16 text-gray-400 mx-auto" />
              <div>
                <p className="text-lg font-semibold text-white">Upload Your Resume</p>
                <p className="text-gray-400">PDF files only, max 10MB</p>
              </div>
            </label>
          </div>
        </div>

        {file && (
          <div className="flex items-center justify-between bg-gray-800 p-4 rounded-xl">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-primary-500" />
              <span className="text-white">{file.name}</span>
            </div>
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </div>
        )}

        {error && (
          <div className="flex items-center space-x-2 text-red-500 bg-red-500/10 p-4 rounded-xl">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {loading && (
        <div className="card text-center py-12">
          <LoadingSpinner text="Analyzing your resume with AI..." />
        </div>
      )}

      {/* Results Section */}
      {analysis && (
        <div className="space-y-8">
          {/* ATS Score */}
          <div className="card text-center space-y-4">
            <h2 className="text-2xl font-bold text-white">ATS Score</h2>
            <div className="space-y-2">
              <div className={`text-6xl font-bold ${getScoreColor(analysis.atsScore)}`}>
                {analysis.atsScore}
              </div>
              <div className="text-gray-400">out of 100</div>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all duration-1000 ${
                  analysis.atsScore >= 80
                    ? 'bg-green-500'
                    : analysis.atsScore >= 60
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${analysis.atsScore}%` }}
              ></div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="card space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-primary-500" />
              <span>Improvement Suggestions</span>
            </h2>
            <div className="space-y-4">
              {analysis.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-3 bg-gray-800 p-4 rounded-xl">
                  <div className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-300">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeScore;