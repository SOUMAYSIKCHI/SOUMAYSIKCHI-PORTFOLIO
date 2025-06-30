import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import projects from '../data/projects';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % selectedProject.imageGallery.length
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.imageGallery.length - 1 : prev - 1
      );
    }
  };

  const ProjectCard = ({ project, isFeatured = false }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    // Auto-slide effect for project images
    useEffect(() => {
      if (isHovered && project.imageGallery.length > 1) {
        const interval = setInterval(() => {
          setImageIndex((prev) => 
            (prev + 1) % project.imageGallery.length
          );
        }, 2000); // Change image every 2 seconds

        return () => clearInterval(interval);
      }
    }, [isHovered, project.imageGallery.length]);

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        whileHover={{ scale: 1.02, y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => handleProjectClick(project)}
        className={`glass rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
          isFeatured ? 'w-full' : 'w-full'
        }`}
      >
        {/* Project Image - Better proportions for featured */}
        <div className={`relative overflow-hidden ${
          isFeatured ? 'h-80 lg:h-96' : 'h-64'
        }`}>
          <img
            src={project.imageGallery[imageIndex]}
            alt={project.name}
            className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
            onError={(e) => {
              console.error(`Failed to load image: ${project.imageGallery[imageIndex]}`);
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Image Counter */}
          {project.imageGallery.length > 1 && (
            <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs font-medium">
              {imageIndex + 1} / {project.imageGallery.length}
            </div>
          )}
          
          {/* Auto-slide Indicator */}
          {project.imageGallery.length > 1 && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex gap-1">
                {project.imageGallery.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      index === imageIndex 
                        ? 'bg-neon-blue' 
                        : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Tech Stack Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {project.techStack.slice(0, 3).map((tech, index) => (
              <span
                key={tech}
                className="px-2 py-1 bg-neon-blue/20 text-neon-blue text-xs rounded-full border border-neon-blue/30 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Project Type */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-neon-purple/20 text-neon-purple text-xs rounded-full border border-neon-purple/30 backdrop-blur-sm">
              {project.type}
            </span>
          </div>
        </div>

        {/* Project Info */}
        <div className={`p-6 ${isFeatured ? 'lg:p-8' : ''}`}>
          <h3 className={`font-bold text-white mb-2 ${
            isFeatured ? 'text-2xl lg:text-3xl' : 'text-xl'
          }`}>
            {project.name}
          </h3>
          <p className={`text-gray-400 mb-4 line-clamp-2 ${
            isFeatured ? 'text-lg lg:text-xl' : 'text-sm'
          }`}>
            {project.description}
          </p>

          {/* Taglines */}
          <div className="space-y-2 mb-4">
            {project.taglines.slice(0, isFeatured ? 3 : 2).map((tagline, index) => (
              <div key={index} className={`text-gray-500 ${
                isFeatured ? 'text-sm lg:text-base' : 'text-xs'
              }`}>
                {tagline}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 px-3 py-2 bg-neon-blue/20 text-neon-blue text-sm rounded-lg hover:bg-neon-blue hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <FiExternalLink className="text-xs" />
              Live Demo
            </a>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 px-3 py-2 bg-gray-700/50 text-gray-300 text-sm rounded-lg hover:bg-gray-600 hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <FiGithub className="text-xs" />
              Code
            </a>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section ref={ref} id="projects" className="py-20 relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-neon-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-neon-blue/10 rounded-full blur-3xl"></div>
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
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A showcase of my most impactful work, demonstrating both frontend and backend development expertise
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.name} project={project} isFeatured={true} />
            ))}
          </div>
        </motion.div>

        {/* Other Projects Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Other Projects
          </h3>
          <p className="text-gray-400">
            Explore more of my work across different technologies and domains
          </p>
        </motion.div>

        {/* Other Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {otherProjects.map((project, index) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-700 sticky top-0 bg-dark-900/95 backdrop-blur-sm z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {selectedProject.name}
                    </h3>
                    <p className="text-gray-400">{selectedProject.type}</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FiX className="text-2xl" />
                  </button>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="relative h-96">
                <img
                  src={selectedProject.imageGallery[currentImageIndex]}
                  alt={`${selectedProject.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error(`Failed to load modal image: ${selectedProject.imageGallery[currentImageIndex]}`);
                    e.target.style.display = 'none';
                  }}
                />
                
                {/* Navigation Arrows */}
                {selectedProject.imageGallery.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    >
                      <FiChevronLeft />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    >
                      <FiChevronRight />
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {selectedProject.imageGallery.length}
                    </div>
                  </>
                )}
              </div>

              {/* Project Details */}
              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Description</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-neon-blue/20 text-neon-blue rounded-full text-sm border border-neon-blue/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Taglines */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {selectedProject.taglines.map((tagline, index) => (
                      <li key={index} className="text-gray-300 flex items-start gap-2">
                        <span className="text-neon-blue mt-1">•</span>
                        {tagline}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-gray-700">
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-neon-blue text-white rounded-lg hover:bg-neon-blue/80 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiExternalLink />
                    View Live Demo
                  </a>
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiGithub />
                    View Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;