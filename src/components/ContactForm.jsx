import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './ContactForm.css';

const ContactForm = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      formRef.current
    )
      .then(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      })
      .catch((err) => {
        setIsSubmitting(false);
        setError(`Failed: ${err?.text || err?.message || JSON.stringify(err)}`);
        console.error('EmailJS error:', err);
      });
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
                <span>youtube.com/@DevFusionMastery</span>
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
              <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
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
                {error && <p style={{ color: '#ef4444', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
