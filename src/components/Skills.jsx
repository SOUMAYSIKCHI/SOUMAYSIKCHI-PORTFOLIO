import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import skills from '../data/skills';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  // Define category metadata
  const categories = [
    {
      name: "Frontend Development",
      description: "Modern web technologies and frameworks",
      icon: "🎨",
      category: "frontend"
    },
    {
      name: "Backend Development", 
      description: "Server-side technologies and APIs",
      icon: "⚙️",
      category: "backend"
    },
    {
      name: "Database & Cloud",
      description: "Data management and cloud services",
      icon: "☁️",
      category: "database"
    },
    {
      name: "DevOps & Tools",
      description: "Development operations and utilities",
      icon: "🛠️",
      category: "devops"
    },
    {
      name: "Development Tools",
      description: "Essential development utilities",
      icon: "📚",
      category: "tools"
    }
  ];

  return (
    <section ref={ref} id="skills" className="py-20 relative bg-[#030303]">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-violet-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl"></div>
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
              Skills & Expertise
            </span>
          </h2>
          <p className="text-xl text-white/40 max-w-2xl mx-auto font-light tracking-wide">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category, index) => {
            const categorySkills = skillsByCategory[category.category] || [];
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass rounded-xl p-6 hover:bg-white/[0.05] transition-all duration-300"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-3xl">{category.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                    <p className="text-white/40 text-sm font-light">{category.description}</p>
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {categorySkills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 + skillIndex * 0.05 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-lg">{skill.icon}</div>
                        <span className="text-white/80 font-medium">{skill.name}</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="flex-1 max-w-24 ml-4">
                        <div className="w-full bg-white/[0.05] rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : {}}
                            transition={{ duration: 1, delay: 0.8 + index * 0.1 + skillIndex * 0.05 }}
                            className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-rose-500"
                          />
                        </div>
                      </div>
                      
                      <span className="text-white/40 text-sm ml-2 w-8 text-right">
                        {skill.level}%
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            Additional Tools & Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'GitHub', 'Git & GitLab', 'Docker', 'AWS', 'Firebase', 'MongoDB', 'PostgreSQL',
              'REST APIs', 'GraphQL', 'Jest', 'Cypress', 'Figma', 'Adobe XD'
            ].map((tool, index) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.05 }}
                className="px-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-full text-white/60 text-sm hover:bg-white/[0.08] hover:text-white transition-all duration-300 backdrop-blur-sm"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 