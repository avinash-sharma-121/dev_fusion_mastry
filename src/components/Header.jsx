import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'header-scrolled glass-card' : ''}`}>
      <div className="container header-container">
        <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo-dark.png" alt="DevFusion Mastery" className="logo-img logo-dark" style={{ height: '35px', objectFit: 'contain' }} />
          <img src="/logo-light.png" alt="DevFusion Mastery" className="logo-img logo-light" style={{ height: '35px', objectFit: 'contain' }} />
        </div>
        
        <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li><a href="#home" className="nav-link" onClick={closeMobileMenu}>Home</a></li>
            <li><a href="#videos" className="nav-link" onClick={closeMobileMenu}>Videos</a></li>
            <li><a href="#playlists" className="nav-link" onClick={closeMobileMenu}>Playlists</a></li>
            <li><a href="#projects" className="nav-link" onClick={closeMobileMenu}>Projects</a></li>
            <li><a href="#testimonials" className="nav-link" onClick={closeMobileMenu}>Testimonials</a></li>
            <li><a href="#community" className="nav-link" onClick={closeMobileMenu}>Community</a></li>
            <li className="mobile-only-link">
              <a href="#contact" className="btn btn-primary" onClick={closeMobileMenu}>Connect</a>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <a href="#contact" className="btn btn-primary desktop-connect-btn">Connect</a>
          <button 
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} 
            onClick={toggleMobileMenu} 
            aria-label="Toggle menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
