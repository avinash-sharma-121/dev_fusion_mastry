import React from 'react';
import ScrollReveal from './ScrollReveal';
import './Community.css';

const Community = () => {
  return (
    <section id="community" className="community-section">
      <div className="container">
        <div className="community-banner glass-card">
          <div className="community-content">
            <ScrollReveal animation="slide-up" delay={0.1}>
              <h2 className="community-title">Join the <span className="text-gradient">Community</span></h2>
            </ScrollReveal>
            <ScrollReveal animation="slide-up" delay={0.2}>
              <p className="community-description">
                Connect with thousands of engineers, share your projects, solve complex infrastructure issues, and prepare for interviews together. Learning is faster when you're not alone!
              </p>
            </ScrollReveal>
            <div className="community-benefits">
              <ScrollReveal animation="scale-up" delay={0.3}>
                <div className="benefit-item">
                  <span className="benefit-icon">💬</span>
                  <span>Live Q&A Sessions</span>
                </div>
              </ScrollReveal>
              <ScrollReveal animation="scale-up" delay={0.4}>
                <div className="benefit-item">
                  <span className="benefit-icon">🚀</span>
                  <span>Project Collaborations</span>
                </div>
              </ScrollReveal>
              <ScrollReveal animation="scale-up" delay={0.5}>
                <div className="benefit-item">
                  <span className="benefit-icon">👔</span>
                  <span>Interview Prep</span>
                </div>
              </ScrollReveal>
            </div>
            <ScrollReveal animation="slide-up" delay={0.6}>
              <a href="https://canary.discord.com/channels/1518215358698360944/1518215358698360947" target="_blank" rel="noopener noreferrer" className="btn btn-primary community-btn">
                Join Discord Server
              </a>
            </ScrollReveal>
          </div>
          <ScrollReveal animation="scale-up" delay={0.3} className="community-visual">
            <div className="floating-icons">
              <div className="float-icon icon-1">💻</div>
              <div className="float-icon icon-2">🔥</div>
              <div className="float-icon icon-3">🤝</div>
              <div className="float-icon icon-4">💡</div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Community;
