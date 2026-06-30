import React from 'react';
import ScrollReveal from './ScrollReveal';
import './TechStack.css';

const TECHNOLOGIES = [
  { name: 'AWS', icon: '☁️' },
  { name: 'Terraform', icon: '🏗️' },
  { name: 'Kubernetes', icon: '☸️' },
  { name: 'Docker', icon: '🐋' },
  { name: 'CI/CD', icon: '⚙️' },
  { name: 'React', icon: '⚛️' },
  { name: 'Agentic AI', icon: '🤖' },
  { name: 'RAG', icon: '🧠' },
  { name: 'DevOps', icon: '🚀' }
];

const TechStack = () => {
  return (
    <div className="tech-stack-container">
      <ScrollReveal animation="fade-in">
        <div className="tech-stack-header">
          <p>MASTERING THE MODERN STACK</p>
        </div>
      </ScrollReveal>
      
      <ScrollReveal animation="slide-up" delay={0.15}>
        <div className="marquee-wrapper">
          <div className="marquee-content">
            {TECHNOLOGIES.map((tech, index) => (
              <div key={`tech-${index}`} className="tech-item glass-card">
                <span className="tech-icon">{tech.icon}</span>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
            {/* Duplicate for infinite scrolling effect */}
            {TECHNOLOGIES.map((tech, index) => (
              <div key={`tech-dup-${index}`} className="tech-item glass-card">
                <span className="tech-icon">{tech.icon}</span>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default TechStack;
