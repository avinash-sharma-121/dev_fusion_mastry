import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header-scrolled glass-card' : ''}`}>
      <div className="container header-container">
        <div className="logo">
          <span className="text-gradient">DevFusion</span> Mastery
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li><a href="#home" className="nav-link">Home</a></li>
            <li><a href="#videos" className="nav-link">Videos</a></li>
            <li><a href="#playlists" className="nav-link">Playlists</a></li>
            <li><a href="#projects" className="nav-link">Projects</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
            <li><ThemeToggle /></li>
          </ul>
        </nav>
        <div className="header-actions">
          <a href="#contact" className="btn btn-primary">Connect</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
