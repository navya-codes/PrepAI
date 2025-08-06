import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import LandingPage from './pages/Landing';
import ResumeScore from './pages/ResumeScore';
import Interview from './pages/Interview';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-elegant relative overflow-x-hidden">
        {/* Background decoration elements */}
        <div className="fixed inset-0 z-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-accent-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-accent-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="fixed inset-0 z-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <Navbar />
          
          <main className="transition-all duration-300 ease-in-out">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/resume-score" element={<ResumeScore />} />
              <Route path="/interview" element={<Interview />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-primary-950/50 backdrop-blur-sm border-t border-primary-800/50 mt-20">
            <div className="container-custom section-padding">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-xl font-serif font-bold text-gradient mb-4">PrepAI</h3>
                  <p className="body-regular mb-4 max-w-md">
                    Elevating careers through AI-powered interview preparation and resume optimization.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-primary-400 hover:text-accent-500 transition-colors duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" />
                      </svg>
                    </a>
                    <a href="#" className="text-primary-400 hover:text-accent-500 transition-colors duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-primary-400 hover:text-accent-500 transition-colors duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                <div>
                  <h4 className="heading-tertiary mb-4">Features</h4>
                  <ul className="space-y-2 body-regular">
                    <li><a href="#" className="text-primary-400 hover:text-accent-500 transition-colors duration-300">Resume Analysis</a></li>
                    <li><a href="#" className="text-primary-400 hover:text-accent-500 transition-colors duration-300">Interview Practice</a></li>
                    <li><a href="#" className="text-primary-400 hover:text-accent-500 transition-colors duration-300">Skill Assessment</a></li>
                    <li><a href="#" className="text-primary-400 hover:text-accent-500 transition-colors duration-300">Career Insights</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="heading-tertiary mb-4">Support</h4>
                  <ul className="space-y-2 body-regular">
                    <li><a href="#" className="text-primary-400 hover:text-accent-500 transition-colors duration-300">Help Center</a></li>
                    <li><a href="#" className="text-primary-400 hover:text-accent-500 transition-colors duration-300">Contact Us</a></li>
                    <li><a href="#" className="text-primary-400 hover:text-accent-500 transition-colors duration-300">Privacy Policy</a></li>
                    <li><a href="#" className="text-primary-400 hover:text-accent-500 transition-colors duration-300">Terms of Service</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-primary-800/50 mt-8 pt-8 text-center">
                <p className="body-small text-primary-500">
                  © 2024 PrepAI. All rights reserved. Crafted with excellence.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;