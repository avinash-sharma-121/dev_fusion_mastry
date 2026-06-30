import React, { useEffect, useState } from 'react';
import { fetchPlaylistVideos } from '../services/youtube';
import ScrollReveal from './ScrollReveal';
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
        <ScrollReveal animation="fade-in">
          <div className="section-header">
            <h2 className="section-title">Current <span className="text-gradient">Projects</span></h2>
            <p className="section-subtitle">Real-world applications built during our tutorials</p>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="loading-state" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            Loading projects...
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <ScrollReveal key={project.id} animation="slide-up" delay={(index % 3) * 0.1}>
                <div className="project-card glass-card">
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
                    <div className="project-links" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-outline" 
                          title="View Source Code on GitHub"
                          style={{ 
                            padding: '0', 
                            border: '1px solid var(--text-primary)', 
                            color: 'var(--text-primary)', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            minWidth: '38px',
                            flexShrink: 0,
                            lineHeight: '0',
                            boxSizing: 'border-box'
                          }}
                        >
                          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                          </svg>
                        </a>
                      )}
                      {project.videoId && (
                        <a 
                          href={`https://www.youtube.com/watch?v=${project.videoId}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-outline" 
                          title="Watch video on YouTube"
                          style={{ 
                            padding: '0', 
                            border: '1px solid #ff0000', 
                            color: '#ff0000', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            minWidth: '38px',
                            flexShrink: 0,
                            lineHeight: '0',
                            boxSizing: 'border-box'
                          }}
                        >
                          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;

