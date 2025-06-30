import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function SplineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
    <section ref={ref} className="py-2  relative bg-[#030303] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-violet-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Go to Projects Button */}
       

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
              3D Experience
            </span>
          </h2>
          <p className="text-xl text-white/40 max-w-2xl mx-auto font-light tracking-wide">
            Interactive 3D design showcasing creativity and technical expertise
          </p>
        </motion.div>

        {/* Spline Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          {/* Glass Container */}
          <div className="glass rounded-2xl p-8 lg:p-12 overflow-hidden relative">
            {/* Container Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05]"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-rose-500"></div>
            <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-rose-500 to-indigo-500"></div>
            
            {/* Corner Decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-indigo-500/50 rounded-tl-lg"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-rose-500/50 rounded-tr-lg"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-rose-500/50 rounded-bl-lg"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-indigo-500/50 rounded-br-lg"></div>

            {/* Spline Model Container */}
            <div className="relative z-10">
              <div className="w-full h-[600px] lg:h-[700px] rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.08]">
                <Spline scene="https://prod.spline.design/B3eChdTb0AiyD-W3/scene.splinecode" />
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-8 right-8 w-4 h-4 bg-indigo-500/60 rounded-full animate-pulse"></div>
            <div className="absolute bottom-8 left-8 w-3 h-3 bg-rose-500/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-8 w-2 h-2 bg-violet-500/60 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 right-8 w-2 h-2 bg-amber-500/60 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          </div>

          {/* Interactive Hint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center mt-6"
          >
            <p className="text-white/40 text-sm font-light">
              💡 Interact with the 3D model to explore
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 