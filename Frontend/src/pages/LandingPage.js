import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Mic, Star, Users, Trophy } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
              PrepAI
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            AI-powered mock interview platform to boost your career prospects
          </p>
        </div>

        {/* Main Action Buttons */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link
            to="/resume-score"
            className="group card hover:border-primary-500 transition-all duration-300 transform hover:scale-105"
          >
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 rounded-2xl mx-auto w-fit">
                <FileText className="h-12 w-12 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Check Your Resume Score</h3>
                <p className="text-gray-400">
                  Get instant ATS scoring and improvement suggestions for your resume
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/interview"
            className="group card hover:border-primary-500 transition-all duration-300 transform hover:scale-105"
          >
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 rounded-2xl mx-auto w-fit">
                <Mic className="h-12 w-12 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Give Mock Interview</h3>
                <p className="text-gray-400">
                  Practice with AI-powered voice interviews and get detailed feedback
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="space-y-12">
        <h2 className="text-4xl font-bold text-center">
          Why Choose{' '}
          <span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
            PrepAI?
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="card text-center space-y-4">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4 rounded-xl mx-auto w-fit">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">AI-Powered Analysis</h3>
            <p className="text-gray-400">
              Advanced AI technology provides accurate scoring and personalized feedback
            </p>
          </div>

          <div className="card text-center space-y-4">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4 rounded-xl mx-auto w-fit">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">No Signup Required</h3>
            <p className="text-gray-400">
              Jump right in without creating accounts or sharing personal information
            </p>
          </div>

          <div className="card text-center space-y-4">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4 rounded-xl mx-auto w-fit">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Career Boost</h3>
            <p className="text-gray-400">
              Improve your interview skills and resume quality to land your dream job
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;