import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiX, FiExternalLink } from 'react-icons/fi';
import certifications from '../data/certifications';

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCert, setSelectedCert] = useState(null);

  const handleCertClick = (cert) => {
    setSelectedCert(cert);
  };

  const closeModal = () => {
    setSelectedCert(null);
  };

  return (
    <section ref={ref} id="certifications" className="py-20 relative bg-[#030303]">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-violet-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
              Certifications & Achievements
            </span>
          </h2>
          <p className="text-xl text-white/40 max-w-2xl mx-auto font-light tracking-wide">
            Validated expertise through industry-recognized certifications and continuous learning
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => handleCertClick(cert)}
              className="glass rounded-xl p-6 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer group"
            >
              <div className="text-center">
                {/* Certificate Image */}
                <div className="relative mb-4">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-white/[0.05] border border-white/[0.08]">
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        console.error(`Failed to load certificate image: ${cert.image}`);
                        e.target.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = 'w-full h-full flex items-center justify-center text-4xl text-indigo-400';
                        fallback.innerHTML = '🏆';
                        e.target.parentNode.appendChild(fallback);
                      }}
                    />
                  </div>
                  {/* View More Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">View Certificate</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{cert.name}</h3>
                <p className="text-white/40 text-sm mb-4 line-clamp-3">{cert.description}</p>
                
                {/* View Certificate Button */}
                <button className="px-4 py-2 bg-white/[0.03] border border-white/[0.08] text-white/60 text-sm rounded-lg hover:bg-white/[0.08] hover:text-white transition-all duration-300 backdrop-blur-sm flex items-center gap-2 mx-auto">
                  <FiExternalLink className="text-xs" />
                  View Certificate
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-white mb-6">
            Notable Achievements
          </h3>
          <p className="text-white/40 max-w-2xl mx-auto font-light tracking-wide">
            Milestones and accomplishments that showcase dedication to excellence
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              icon: "🏆",
              title: "Top Performer",
              subtitle: "Academic Excellence",
              description: "Consistently maintained high academic standards"
            },
            {
              icon: "🚀",
              title: "Project Leader",
              subtitle: "Team Management",
              description: "Successfully led multiple development teams"
            },
            {
              icon: "💡",
              title: "Innovation Award",
              subtitle: "Creative Solutions",
              description: "Recognized for innovative problem-solving approaches"
            },
            {
              icon: "🌟",
              title: "Mentorship",
              subtitle: "Knowledge Sharing",
              description: "Helped 50+ developers improve their skills"
            }
          ].map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass rounded-xl p-6 text-center group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {achievement.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-1">
                {achievement.title}
              </h4>
              <p className="text-lg font-semibold text-white/80 mb-2">
                {achievement.subtitle}
              </p>
              <p className="text-white/40 text-sm">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Progress */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Learning Progress
            </h3>
            <p className="text-white/40 max-w-2xl mx-auto font-light tracking-wide">
              Continuous improvement through structured learning and hands-on projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Frontend Development", progress: 95, color: "from-indigo-500 to-rose-500" },
              { name: "Backend Development", progress: 90, color: "from-violet-500 to-purple-500" },
              { name: "Database Management", progress: 85, color: "from-amber-500 to-orange-500" },
              { name: "DevOps & Cloud", progress: 80, color: "from-cyan-500 to-blue-500" },
              { name: "UI/UX Design", progress: 75, color: "from-emerald-500 to-green-500" },
              { name: "Mobile Development", progress: 70, color: "from-pink-500 to-rose-500" }
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.8 + index * 0.1 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-white/80 font-medium">{skill.name}</span>
                  <span className="text-white/40 text-sm">{skill.progress}%</span>
                </div>
                <div className="w-full bg-white/[0.05] rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.progress}%` } : {}}
                    transition={{ duration: 1, delay: 2 + index * 0.1 }}
                    className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/[0.08] sticky top-0 bg-[#030303]/95 backdrop-blur-sm z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {selectedCert.name}
                    </h3>
                    <p className="text-white/60">Certificate Details</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/[0.08] rounded-full"
                  >
                    <FiX className="text-2xl" />
                  </button>
                </div>
              </div>

              {/* Certificate Image */}
              <div className="p-6">
                <div className="relative">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.name}
                    className="w-full h-auto max-h-[60vh] object-contain rounded-lg shadow-lg"
                    onError={(e) => {
                      console.error(`Failed to load certificate image: ${selectedCert.image}`);
                      e.target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-64 flex items-center justify-center text-6xl text-indigo-400 bg-white/[0.05] rounded-lg border border-white/[0.08]';
                      fallback.innerHTML = '🏆';
                      e.target.parentNode.appendChild(fallback);
                    }}
                  />
                </div>
              </div>

              {/* Certificate Description */}
              <div className="p-6 border-t border-white/[0.08]">
                <h4 className="text-lg font-semibold text-white mb-3">Description</h4>
                <p className="text-white/80 leading-relaxed">
                  {selectedCert.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;