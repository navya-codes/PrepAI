import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, BookOpen, User, Calendar, ArrowLeft } from 'lucide-react';

const Dashboard = () => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const storedResults = localStorage.getItem('interviewResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, []);

  if (!results) {
    return (
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-4xl font-bold">
          Interview{' '}
          <span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
            Dashboard
          </span>
        </h1>
        <div className="card py-12">
          <p className="text-gray-400 text-lg">
            No interview results found. Please complete an interview first.
          </p>
          <Link to="/interview" className="btn-primary mt-6 inline-flex items-center space-x-2">
            <span>Start Interview</span>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Interview{' '}
            <span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
              Results
            </span>
          </h1>
          <div className="flex items-center space-x-4 mt-2 text-gray-400">
            {results.candidateName && (
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{results.candidateName}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(results.completedAt)}</span>
            </div>
          </div>
        </div>
        <Link to="/interview" className="btn-secondary flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>New Interview</span>
        </Link>
      </div>

      {/* Performance Summary */}
      <div className="card space-y-4">
        <h2 className="text-2xl font-bold text-white">Performance Summary</h2>
        <p className="text-gray-300 leading-relaxed">{results.summary}</p>
      </div>

      {/* Strengths and Weaknesses Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Strengths */}
        <div className="card space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-green-500" />
            <span>Strengths</span>
          </h2>
          <div className="space-y-4">
            {results.strengths.map((strength, index) => (
              <div key={index} className="flex items-start space-x-3 bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <p className="text-gray-300">{strength}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Weaknesses */}
        <div className="card space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <TrendingDown className="h-6 w-6 text-red-500" />
            <span>Areas to Work On</span>
          </h2>
          <div className="space-y-4">
            {results.weaknesses.map((weakness, index) => (
              <div key={index} className="flex items-start space-x-3 bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  !
                </div>
                <p className="text-gray-300">{weakness}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Improvements and Resources */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Improvements */}
        <div className="card space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-primary-500" />
            <span>Improvement Areas</span>
          </h2>
          <div className="space-y-4">
            {results.improvements.map((improvement, index) => (
              <div key={index} className="flex items-start space-x-3 bg-primary-500/10 border border-primary-500/20 p-4 rounded-xl">
                <div className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-gray-300">{improvement}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="card space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-blue-500" />
            <span>Recommended Resources</span>
          </h2>
          <div className="space-y-4">
            {results.resources.map((resource, index) => (
              <div key={index} className="flex items-start space-x-3 bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  📚
                </div>
                <p className="text-gray-300">{resource}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/interview" className="btn-primary flex items-center space-x-2">
          <span>Take Another Interview</span>
        </Link>
        <Link to="/resume-score" className="btn-secondary flex items-center space-x-2">
          <span>Check Resume Score</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;