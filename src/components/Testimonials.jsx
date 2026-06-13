import React from 'react';
import './Testimonials.css';

const MOCK_TESTIMONIALS = [
  {
    id: 1,
    name: "Rahul Verma",
    role: "DevOps Engineer @ Deloitte",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "DevFusion Mastery completely changed my perspective on Cloud. The interview prep series directly helped me clear my Deloitte technical rounds!",
    rating: 5
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Cloud Architect",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "The Agentic AI and RAG videos are gold. Complex topics are broken down so beautifully. I highly recommend his content to all my juniors.",
    rating: 5
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "SRE @ Startup",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "I built my entire portfolio using the CI/CD pipeline tutorial. The hands-on, practical approach is exactly what the industry needs.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Success <span className="text-gradient">Stories</span></h2>
          <p className="section-subtitle">Hear from engineers who cracked their dream Cloud & DevOps roles</p>
        </div>

        <div className="testimonials-grid">
          {MOCK_TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card glass-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">{testimonial.text}</p>
              
              <div className="testimonial-author">
                <img src={testimonial.avatar} alt={testimonial.name} className="author-avatar" />
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-role">{testimonial.role}</p>
                  <div className="star-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
