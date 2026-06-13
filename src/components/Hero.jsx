import React, { useState, useEffect } from 'react';
import { fetchChannelStats } from '../services/youtube';
import './Hero.css';

const Hero = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      const data = await fetchChannelStats();
      if (data) {
        setStats(data);
      }
    };
    loadStats();
  }, []);

  return (
    <section id="home" className="hero section">
      <div className="hero-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      <div className="container hero-content animate-fade-in">
        <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Master Cloud & DevOps with <br/>
          <span className="text-gradient">DevFusion Mastery</span>
        </h1>
        <p className="hero-subtitle">
          Your go-to channel for AI, DevOps, Cloud, Automation, and real tech interview experiences. 
          Learn Kubernetes, AWS, Terraform, CI/CD, Agentic AI, and modern DevOps concepts in simple and practical ways.
        </p>
        {stats && (
          <div className="hero-stats animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="stat-badge">
              <span className="stat-icon">👥</span>
              <span className="stat-value">{Number(stats.subscriberCount).toLocaleString()}</span>
              <span className="stat-label">Subscribers</span>
            </div>
            <div className="stat-badge">
              <span className="stat-icon">👁️</span>
              <span className="stat-value">{Number(stats.viewCount).toLocaleString()}</span>
              <span className="stat-label">Views</span>
            </div>
            <div className="stat-badge">
              <span className="stat-icon">🎥</span>
              <span className="stat-value">{Number(stats.videoCount).toLocaleString()}</span>
              <span className="stat-label">Videos</span>
            </div>
          </div>
        )}
        <div className="hero-buttons">
          <a href="#videos" className="btn btn-primary">Watch Videos</a>
          <a href="#projects" className="btn btn-outline">Explore Projects</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
