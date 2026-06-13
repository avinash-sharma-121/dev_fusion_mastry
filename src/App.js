import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import VideoSection from './components/VideoSection';
import PlaylistsSection from './components/PlaylistsSection';
import ProjectsSection from './components/ProjectsSection';
import Testimonials from './components/Testimonials';
import Community from './components/Community';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Hero />
        <TechStack />
        <VideoSection />
        <PlaylistsSection />
        <ProjectsSection />
        <Testimonials />
        <Community />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
