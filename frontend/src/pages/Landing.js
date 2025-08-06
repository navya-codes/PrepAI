import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-elegant text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 animate-fade-in">
            Welcome to <span className="text-accent-500">PrepAI</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 animate-slide-up">
            Your intelligent companion for interview preparation and career success
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-glow">
              Get Started
            </button>
            <button className="border border-accent-500 text-accent-500 hover:bg-accent-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            Why Choose PrepAI?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-slate-800 shadow-elegant">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Practice</h3>
              <p className="text-gray-300">
                Advanced AI technology provides personalized interview questions and feedback
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-slate-800 shadow-elegant">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Guidance</h3>
              <p className="text-gray-300">
                Learn from industry experts and proven interview strategies
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-slate-800 shadow-elegant">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
              <p className="text-gray-300">
                Monitor your improvement with detailed analytics and performance insights
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of professionals who've successfully prepared with PrepAI
          </p>
          <button className="bg-gradient-accent text-white px-12 py-4 rounded-lg font-semibold text-lg hover:shadow-glow transition-all">
            Start Your Journey
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;