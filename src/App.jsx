import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DemoHeroGeometric } from './components/DemoHeroGeometric';
import Hero from './components/Hero';
import Skills from './components/Skills';
import SplineSection from './components/SplineSection';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Footer from './components/Footer';
import MatrixBackground from './components/MatrixBackground';
import CursorGlow from './components/CursorGlow';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('App component mounted');
    // Simulate loading time
    const timer = setTimeout(() => {
      console.log('Loading complete, setting isLoading to false');
      setIsLoading(false);
    }, 4000); // Increased to 4 seconds to show the beautiful loading animation

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    console.log('Showing loading screen');
    return <DemoHeroGeometric />;
  }

  console.log('Rendering main app content');

  return (
    <div className="App relative min-h-screen bg-[#030303] overflow-x-hidden">
      <CursorGlow />
      <MatrixBackground />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <Hero />
        <Skills />
        <Projects />
        <Certifications />
        <SplineSection />
        <Footer />
      </motion.div>
    </div>
  );
}

export default App; 