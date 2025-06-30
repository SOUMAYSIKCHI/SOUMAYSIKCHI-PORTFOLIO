import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { portfolioMeta, socialLinks } from '../data/portfolioMeta';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      
      setMousePosition({
        x: (clientX / innerWidth) * 2 - 1,
        y: -(clientY / innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth scroll function
  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#030303]">
      {/* Navigation Menu */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed top-8 left-0 right-0 z-50 flex justify-center"
      >
        <div className="glass rounded-full px-6 py-3 flex items-center gap-8">
          <button
            onClick={() => smoothScrollTo('projects')}
            className="text-white/60 hover:text-white transition-colors duration-300 text-sm font-medium hover:scale-105"
          >
            Projects
          </button>
          <button
            onClick={() => smoothScrollTo('skills')}
            className="text-white/60 hover:text-white transition-colors duration-300 text-sm font-medium hover:scale-105"
          >
            Skills
          </button>
          <button
            onClick={() => smoothScrollTo('certifications')}
            className="text-white/60 hover:text-white transition-colors duration-300 text-sm font-medium hover:scale-105"
          >
            Certifications
          </button>
        </div>
      </motion.nav>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-violet-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Logo/Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] w-fit"
          >
            <div className="h-2 w-2 rounded-full bg-rose-500/80"></div>
            <span className="text-sm text-white/60 tracking-wide font-medium">
              PORTFOLIO
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
              Hi, I'm {portfolioMeta.username}
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 text-3xl lg:text-4xl">
              {portfolioMeta.tagline}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-white/40 leading-relaxed max-w-lg font-light tracking-wide"
          >
            {portfolioMeta.about}
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex gap-4"
          >
            <a
              href={portfolioMeta.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-300 backdrop-blur-sm hover:scale-110"
            >
              <FiGithub className="text-xl" />
            </a>
            <a
              href={portfolioMeta.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-300 backdrop-blur-sm hover:scale-110"
            >
              <FiLinkedin className="text-xl" />
            </a>
            <a
              href={`mailto:${portfolioMeta.email}`}
              className="p-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-300 backdrop-blur-sm hover:scale-110"
            >
              <FiMail className="text-xl" />
            </a>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex gap-4 flex-wrap"
          >
            <button
              onClick={() => smoothScrollTo('projects')}
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-rose-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:scale-105 hover:from-indigo-600 hover:to-rose-600"
            >
              View Projects
            </button>
            <a
              href={`mailto:${portfolioMeta.email}`}
              className="px-8 py-4 bg-white/[0.03] border border-white/[0.08] text-white/80 font-semibold rounded-lg hover:bg-white/[0.08] hover:text-white transition-all duration-300 backdrop-blur-sm hover:scale-105"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>

        {/* Right Content - Spline 3D Model */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-96 lg:h-[500px] relative flex items-center justify-center"
        >
          {/* Spline 3D Model */}
          <div className="w-full h-full">
            <Spline scene="https://prod.spline.design/AjIqhmyc-5AX-paY/scene.splinecode" />
          </div>

          {/* Floating Code Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-gradient-to-r from-indigo-500/60 to-rose-500/60 rounded-full pointer-events-none"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${30 + (i * 8)}%`,
              }}
              animate={{
                y: [0, -20, 0],
                scale: [0.5, 1, 0.5],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => smoothScrollTo('projects')}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center backdrop-blur-sm hover:border-white/40 transition-colors duration-300"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gradient-to-b from-indigo-500 to-rose-500 rounded-full mt-2"
          />
        </motion.div>
        <p className="text-xs text-white/40 mt-2 text-center">Scroll to explore</p>
      </motion.div>
    </section>
  );
};

export default Hero; 