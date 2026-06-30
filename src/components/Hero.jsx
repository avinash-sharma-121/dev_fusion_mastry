import React, { useState, useEffect } from 'react';
import { fetchChannelStats } from '../services/youtube';
import ScrollReveal from './ScrollReveal';
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
      <div className="container hero-content">
        <ScrollReveal animation="slide-up" delay={0.1}>
          <h1 className="hero-title">
            Master Cloud & DevOps with <br/>
            <span className="text-gradient">DevFusion Mastery</span>
          </h1>
        </ScrollReveal>
        
        <ScrollReveal animation="slide-up" delay={0.25}>
          <p className="hero-subtitle">
            Your go-to channel for AI, DevOps, Cloud, Automation, and real tech interview experiences. 
            Learn Kubernetes, AWS, Terraform, CI/CD, Agentic AI, and modern DevOps concepts in simple and practical ways.
          </p>
        </ScrollReveal>

        {stats && (
          <div className="hero-stats">
            <ScrollReveal animation="scale-up" delay={0.4}>
              <div className="stat-badge">
                <span className="stat-icon">👥</span>
                <span className="stat-value">{Number(stats.subscriberCount).toLocaleString()}</span>
                <span className="stat-label">Subscribers</span>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="scale-up" delay={0.5}>
              <div className="stat-badge">
                <span className="stat-icon">👁️</span>
                <span className="stat-value">{Number(stats.viewCount).toLocaleString()}</span>
                <span className="stat-label">Views</span>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="scale-up" delay={0.6}>
              <div className="stat-badge">
                <span className="stat-icon">🎥</span>
                <span className="stat-value">{Number(stats.videoCount).toLocaleString()}</span>
                <span className="stat-label">Videos</span>
              </div>
            </ScrollReveal>
          </div>
        )}

        <ScrollReveal animation="slide-up" delay={0.7} className="hero-buttons">
          <a href="#videos" className="btn btn-primary">Watch Videos</a>
          <a href="#projects" className="btn btn-outline">Explore Projects</a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Hero;
