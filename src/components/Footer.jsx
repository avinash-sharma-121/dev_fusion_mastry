import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo-dark.png" alt="DevFusion Mastery" className="logo-img logo-dark" style={{ height: '35px', objectFit: 'contain' }} />
          <img src="/logo-light.png" alt="DevFusion Mastery" className="logo-img logo-light" style={{ height: '35px', objectFit: 'contain' }} />
        </div>
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} DevFusion Mastery. All rights reserved.
        </p>
        <div className="footer-socials">
          <a href="https://www.youtube.com/channel/UCe-tn8Fc3EN-g4qWaSJ_uIA" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">YT</a>
          <a href="#!" className="social-link" aria-label="GitHub">GH</a>
          <a href="#!" className="social-link" aria-label="Twitter">TW</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
