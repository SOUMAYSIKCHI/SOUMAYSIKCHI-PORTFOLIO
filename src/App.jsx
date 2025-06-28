import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroAnimation from './components/IntroAnimation';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Footer from './components/Footer';
import MatrixBackground from './components/MatrixBackground';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    console.log('App component mounted');
    // Simulate loading time
    const timer = setTimeout(() => {
      console.log('Loading complete, setting isLoading to false');
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleIntroComplete = () => {
    console.log('Intro animation completed');
    setShowIntro(false);
  };

  if (isLoading) {
    console.log('Showing loading screen');
    return (
      <div className="loading-screen">
        <div className="loading-text">
          Loading PORTFOLIO<span className="loading-dots"></span>
        </div>
      </div>
    );
  }

  console.log('Rendering main app content');

  return (
    <div className="App relative min-h-screen bg-dark-900 overflow-x-hidden">
      <MatrixBackground />
      
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroAnimation 
            key="intro"
            onComplete={handleIntroComplete}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!showIntro && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <Hero />
            <Skills />
            <Projects />
            <Certifications />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App; 