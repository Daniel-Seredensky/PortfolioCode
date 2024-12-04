import React from 'react';
import './LandingPage.css';
import { delay, motion } from 'framer-motion';

// Define variants for the project card
const cardVariants = {
    rest: {
      scale: 1,
      backgroundColor: "#6B4226",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#8B5A2B", 
      boxShadow: "0 8px 15px rgba(0, 0, 0, 0.4)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
};
  
  
// Define variants for the project details
const detailsVariants = {
  rest: {
    opacity: 0,
    height: 0,
    transition: {
      ease: "easeInOut",
      duration: .5,
    },
  },
  hover: {
    opacity: 1,
    height: "auto",
    transition: {
      ease: "easeInOut",
      duration: .5,
    },
  },
};

// ProjectShowcase Component
const ProjectShowcase = ({ projects }) => {
  return (
    <div className="space-y-15">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          className="project-card"
          variants={cardVariants}
          initial="rest"
          whileHover="hover"
        >
          {/* Title */}
          <h4 className="project-title">{project.title}</h4>
          {/* Tech Tags */}
          <div className="project-techs">
            {project.tech.map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
          {/* Project Details: Description and Content */}
          <motion.div className="project-details" variants={detailsVariants}>
            <p className="project-description">{project.description}</p>
            {/* Render content if it exists */}
            {project.content && (
              <div className="project-content">
                {/* Handle different content types */}
                {project.content.type === 'image' && (
                  <img src={project.content.src} alt={project.title} className="project-image" />
                )}
                {project.content.type === 'gif' && (
                  <img src={project.content.src} alt={project.title} className="project-gif" />
                )}
                {project.content.type === 'text' && <p>{project.content.text}</p>}
                {project.content.type === 'link' && (
                  <a href={project.content.href} target="_blank" rel="noopener noreferrer">
                    {project.content.text}
                  </a>
                )}
                {project.content.type === 'gallery' && (
                  <div className="project-gallery">
                    {project.content.images.map((src, idx) => (
                      <img key={idx} src={src} alt={`${project.title} ${idx + 1}`} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectShowcase;
