import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiAward, FiExternalLink, FiX } from 'react-icons/fi';
import certifications from '../data/certifications';

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [flippedCard, setFlippedCard] = useState(null);
  const [selectedCertImage, setSelectedCertImage] = useState(null);

  const handleCardFlip = (index) => {
    setFlippedCard(flippedCard === index ? null : index);
  };

  const handleViewCertificate = (cert, e) => {
    e.stopPropagation();
    setSelectedCertImage(cert);
  };

  const closeImageModal = () => {
    setSelectedCertImage(null);
  };

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-neon-green/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-neon-pink/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Certifications</span>
            <br />
            <span className="text-gray-300 text-2xl lg:text-3xl">& Achievements</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Professional certifications and achievements that validate my expertise 
            in various technologies and development practices.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Flip Card Container */}
              <div
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.7s',
                  transform: flippedCard === index ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
                className="relative w-full h-80"
                onClick={() => handleCardFlip(index)}
              >
                {/* Front of Card */}
                <div style={{ backfaceVisibility: 'hidden' }} className="absolute inset-0">
                  <div className="glass rounded-xl p-6 h-full flex flex-col justify-between cursor-pointer hover:scale-105 transition-transform duration-300">
                    {/* Certificate Image */}
                    <div className="flex-1 flex items-center justify-center mb-4">
                      <div className="w-32 h-32 rounded-full flex items-center justify-center overflow-hidden bg-gray-800 border-2 border-neon-blue/30 shadow-lg">
                        <img 
                          src={cert.image}
                          alt={cert.name}
                          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                          onError={(e) => {
                            console.error(`Failed to load certification image: ${cert.image}`);
                            e.target.style.display = 'none';
                            // Show fallback icon
                            const fallback = document.createElement('div');
                            fallback.className = 'w-full h-full flex items-center justify-center text-4xl text-neon-blue';
                            fallback.innerHTML = '🏆';
                            e.target.parentNode.appendChild(fallback);
                          }}
                        />
                      </div>
                    </div>

                    {/* Certificate Info */}
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {cert.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Click to view details
                      </p>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  </div>
                </div>

                {/* Back of Card */}
                <div style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} className="absolute inset-0">
                  <div className="glass rounded-xl p-6 h-full flex flex-col justify-between">
                    {/* Certificate Description */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-neon-blue mb-4">
                        Certificate Details
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {cert.description}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="mt-4">
                      <button 
                        onClick={(e) => handleViewCertificate(cert, e)}
                        className="w-full px-4 py-2 bg-neon-blue/20 text-neon-blue rounded-lg hover:bg-neon-blue hover:text-white transition-colors flex items-center justify-center gap-2"
                      >
                        <FiExternalLink className="text-sm" />
                        View Certificate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-neon-blue mb-4">
              Notable Achievements
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Milestones and recognitions that highlight my commitment to continuous learning and excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "160 Days",
                subtitle: "DSA Streak",
                description: "Consistent problem-solving on GeeksforGeeks",
                icon: "📈"
              },
              {
                title: "Rank #1784",
                subtitle: "SmartInterview",
                description: "Out of 43,371 participants globally",
                icon: "🏆"
              },
              {
                title: "UI/UX",
                subtitle: "Design Expert",
                description: "Certified in design principles and user testing",
                icon: "🎨"
              },
              {
                title: "Enterprise",
                subtitle: "Experience",
                description: "IBM Frontend Internship completed",
                icon: "🏢"
              }
            ].map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-xl p-6 text-center group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {achievement.icon}
                </div>
                <h4 className="text-2xl font-bold text-neon-blue mb-1">
                  {achievement.title}
                </h4>
                <p className="text-lg font-semibold text-white mb-2">
                  {achievement.subtitle}
                </p>
                <p className="text-gray-400 text-sm">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Progress */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-neon-blue mb-4">
              Learning Progress
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Continuous improvement through structured learning and hands-on projects.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: "Frontend Development",
                progress: 90,
                color: "from-neon-blue to-neon-purple"
              },
              {
                title: "Backend Development",
                progress: 85,
                color: "from-neon-purple to-neon-pink"
              },
              {
                title: "Database & Cloud",
                progress: 80,
                color: "from-neon-pink to-neon-green"
              },
              {
                title: "DevOps & Tools",
                progress: 75,
                color: "from-neon-green to-neon-blue"
              }
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.4 + index * 0.1 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{skill.title}</span>
                  <span className="text-neon-blue font-bold">{skill.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.progress}%` } : {}}
                    transition={{ duration: 1.5, delay: 1.6 + index * 0.1 }}
                    className={`h-3 bg-gradient-to-r ${skill.color} rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Certificate Image Modal */}
      <AnimatePresence>
        {selectedCertImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={closeImageModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full h-[90vh] bg-dark-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-700 bg-dark-900/95 backdrop-blur-sm flex-shrink-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {selectedCertImage.name}
                    </h3>
                    <p className="text-gray-400">Certificate Image</p>
                  </div>
                  <button
                    onClick={closeImageModal}
                    className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
                  >
                    <FiX className="text-2xl" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Certificate Image */}
                <div className="p-6">
                  <div className="relative">
                    <img
                      src={selectedCertImage.image}
                      alt={selectedCertImage.name}
                      className="w-full h-auto max-h-none object-contain rounded-lg shadow-lg"
                      onError={(e) => {
                        console.error(`Failed to load certificate image: ${selectedCertImage.image}`);
                        e.target.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = 'w-full h-64 flex items-center justify-center text-6xl text-neon-blue bg-gray-800 rounded-lg';
                        fallback.innerHTML = '🏆';
                        e.target.parentNode.appendChild(fallback);
                      }}
                    />
                  </div>
                </div>

                {/* Certificate Description */}
                <div className="p-6 border-t border-gray-700">
                  <h4 className="text-lg font-semibold text-neon-blue mb-3">Description</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedCertImage.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;