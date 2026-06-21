import React, { useEffect, useState } from 'react';
import { fetchPlaylistVideos } from '../services/youtube';
import './ProjectsSection.css';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchPlaylistVideos('Cloud & DevOps Projects');
        setProjects(data || []);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Current <span className="text-gradient">Projects</span></h2>
          <p className="section-subtitle">Real-world applications built during our tutorials</p>
        </div>

        {loading ? (
          <div className="loading-state" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            Loading projects...
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
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
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Live Demo</a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>GitHub</a>
                    )}
                    {project.videoId && (
                      <a href={`https://www.youtube.com/watch?v=${project.videoId}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', border: '1px solid #ff0000', color: '#ff0000' }}>Watch Video</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;

