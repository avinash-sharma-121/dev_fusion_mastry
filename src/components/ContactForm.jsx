import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call for now since we don't have an endpoint
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="contact-wrapper">
          <div className="contact-info">
            <h2 className="section-title">Let's <span className="text-gradient">Connect</span></h2>
            <p className="contact-description">
              Have a question, want to collaborate on a project, or just want to say hi? 
              Drop me a message below.
            </p>
            
            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="contact-icon">✉</div>
                <span>contact@devfusionmastery.com</span>
              </div>
              <div className="contact-detail-item">
                <div className="contact-icon">▶</div>
                <span>youtube.com/channel/UCe-tn8Fc3EN-g4qWaSJ_uIA</span>
              </div>
            </div>
          </div>

          <div className="contact-form-container glass-card">
            {isSubmitted ? (
              <div className="success-message animate-fade-in">
                <div className="success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="input-group">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Your Name" 
                    required 
                    className="input-field"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Your Email" 
                    required 
                    className="input-field"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <textarea 
                    name="message" 
                    placeholder="Your Message" 
                    required 
                    rows="5"
                    className="input-field"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className={`btn btn-primary submit-btn ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
