import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navigation = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'Resume Score', href: '/resume-score', current: location.pathname === '/resume-score' },
    { name: 'Interview', href: '/interview', current: location.pathname === '/interview' },
    { name: 'Dashboard', href: '/dashboard', current: location.pathname === '/dashboard' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
      scrolled 
        ? 'bg-primary-950/95 backdrop-blur-md border-b border-primary-800/50 shadow-elegant' 
        : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-accent-500 to-accent-600 rounded-lg flex items-center justify-center shadow-glow">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-400 rounded-full animate-pulse-elegant"></div>
              </div>
              <span className="text-2xl font-serif font-bold text-gradient">PrepAI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out ${
                    item.current
                      ? 'bg-accent-500/20 text-accent-400 shadow-inner-elegant'
                      : 'text-primary-300 hover:text-white hover:bg-primary-700/30'
                  } focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-primary-900`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="btn-ghost">
              Sign In
            </button>
            <button className="btn-primary">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-primary-300 hover:text-white hover:bg-primary-700/30 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6 transition-transform duration-300`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6 transition-transform duration-300`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen 
          ? 'max-h-screen opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-primary-950/98 backdrop-blur-md border-b border-primary-800/50 shadow-elegant-lg">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out ${
                item.current
                  ? 'bg-accent-500/20 text-accent-400 shadow-inner-elegant'
                  : 'text-primary-300 hover:text-white hover:bg-primary-700/30'
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Mobile CTA buttons */}
          <div className="px-4 pt-4 pb-2 space-y-3 border-t border-primary-800/50 mt-4">
            <button className="w-full text-left px-4 py-3 rounded-lg font-medium text-primary-300 hover:text-white hover:bg-primary-700/30 transition-all duration-300 ease-in-out">
              Sign In
            </button>
            <button className="w-full btn-primary">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;