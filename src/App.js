import React, { lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import VideoSection from './components/VideoSection';
import Footer from './components/Footer';

// Lazy load below-the-fold components
const PlaylistsSection = lazy(() => import('./components/PlaylistsSection'));
const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Community = lazy(() => import('./components/Community'));
const ContactForm = lazy(() => import('./components/ContactForm'));

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Hero />
        <TechStack />
        <VideoSection />
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>Loading...</div>}>
          <PlaylistsSection />
          <ProjectsSection />
          <Testimonials />
          <Community />
          <ContactForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
