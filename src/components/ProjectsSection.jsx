import React from 'react';
import './ProjectsSection.css';

const PROJECTS_DATA = [
  {
    id: 1,
    title: 'E-commerce Dashboard',
    description: 'A comprehensive admin dashboard for e-commerce platforms built with React, Redux, and Tailwind CSS. Features dark mode and complex data visualizations.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
    tags: ['React', 'Redux', 'Chart.js'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    id: 2,
    title: 'Social Media Clone',
    description: 'Full-stack social media application allowing users to post, comment, and like. Built with MERN stack and Socket.io for real-time notifications.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
    tags: ['MongoDB', 'Express', 'React', 'Node'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    id: 3,
    title: 'AI Image Generator',
    description: 'An AI-powered application that generates images from text prompts using OpenAI API. Features a sleek glassmorphic UI.',
    image: 'https://images.unsplash.com/photo-1678280628795-dd72c6cb4f8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
    tags: ['Next.js', 'OpenAI', 'CSS Modules'],
    githubUrl: '#',
    liveUrl: '#'
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured <span className="text-gradient">Projects</span></h2>
          <p className="section-subtitle">Real-world applications built during our tutorials</p>
        </div>

        <div className="projects-grid">
          {PROJECTS_DATA.map((project) => (
            <div key={project.id} className="project-card glass-card">
              <div className="project-image-container">
                <img src={project.image} alt={project.title} className="project-image" />
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{padding: '0.5rem 1rem', fontSize: '0.9rem'}}>Live Demo</a>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{padding: '0.5rem 1rem', fontSize: '0.9rem'}}>GitHub</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
