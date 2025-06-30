import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { portfolioMeta, socialLinks } from '../data/portfolioMeta';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-20 bg-[#030303] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl"></div>
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-violet-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Footer Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-xl p-8 max-w-2xl mx-auto"
          >
            <div className="text-center space-y-4">
              {/* Logo/Name */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] w-fit mx-auto"
              >
                <div className="h-2 w-2 rounded-full bg-rose-500/80"></div>
                <span className="text-sm text-white/60 tracking-wide font-medium">
                  PORTFOLIO
                </span>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-white/40 text-lg font-light tracking-wide"
              >
                Engineering Imagination into Code
              </motion.p>

              {/* Made with Love */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center justify-center gap-2 text-white/30"
              >
                <span>Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <FiHeart className="text-rose-500" />
                </motion.div>
                <span>& Modern Web Technologies</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center gap-6 mt-8"
          >
            <a
              href={portfolioMeta.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-300 backdrop-blur-sm"
            >
              <FiGithub className="text-xl" />
            </a>
            <a
              href={portfolioMeta.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-300 backdrop-blur-sm"
            >
              <FiLinkedin className="text-xl" />
            </a>
            <a
              href={`mailto:${portfolioMeta.email}`}
              className="p-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-300 backdrop-blur-sm"
            >
              <FiMail className="text-xl" />
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 text-center text-white/30"
          >
            <p className="text-sm">
              © {currentYear} {portfolioMeta.username}. All rights reserved.
            </p>
            <p className="text-xs mt-2 text-white/20">
              Built with React, Three.js, and Tailwind CSS
            </p>
          </motion.div>

          {/* Back to Top Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-8 px-6 py-3 glass rounded-lg text-white/80 hover:text-white hover:bg-white/[0.08] transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            Back to Top
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 