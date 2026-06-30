import React, { useEffect, useState } from 'react';
import { fetchLatestVideos } from '../services/youtube';
import ScrollReveal from './ScrollReveal';
import './VideoSection.css';

const VideoSection = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      const data = await fetchLatestVideos();
      setVideos(data);
      setLoading(false);
    };
    loadVideos();
  }, []);

  useEffect(() => {
    if (!videos || videos.length === 0) return;

    // Retrieve or create the JSON-LD script tag in head
    let script = document.getElementById('jsonld-video-schema');
    if (!script) {
      script = document.createElement('script');
      script.id = 'jsonld-video-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": videos.map((video) => ({
        "@type": "VideoObject",
        "name": video.snippet.title,
        "description": video.snippet.description,
        "thumbnailUrl": [
          video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default?.url
        ],
        "uploadDate": video.snippet.publishedAt,
        "embedUrl": `https://www.youtube.com/embed/${video.id.videoId}`,
        "contentUrl": `https://www.youtube.com/watch?v=${video.id.videoId}`
      }))
    };

    script.textContent = JSON.stringify(schemaData);

    return () => {
      const existingScript = document.getElementById('jsonld-video-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [videos]);

  return (
    <section id="videos" className="section video-section">
      <div className="container">
        <ScrollReveal animation="fade-in">
          <div className="section-header">
            <h2 className="section-title">Latest <span className="text-gradient">Tutorials</span></h2>
            <p className="section-subtitle">Watch the newest videos from DevFusion Mastery</p>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="loading-state">Loading videos...</div>
        ) : (
          <div className="video-grid">
            {videos.map((video, index) => {
              if (index === 0 || index === 1) {
                return (
                  <ScrollReveal key={video.id.videoId} animation="slide-up" delay={index * 0.1}>
                    <div className="video-card glass-card">
                      <div className="video-thumbnail-container">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.id.videoId}`}
                          title={video.snippet.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="video-iframe"
                        ></iframe>
                      </div>
                      <div className="video-info">
                        <h3 className="video-title">{video.snippet.title}</h3>
                        <p className="video-description">
                          {video.snippet.description.substring(0, 100)}...
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              }

              return (
                <ScrollReveal key={video.id.videoId} animation="slide-up" delay={(index % 4) * 0.1}>
                  <a 
                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="video-card glass-card"
                  >
                    <div className="video-thumbnail-container">
                      <img 
                        src={video.snippet.thumbnails.medium.url} 
                        alt={video.snippet.title} 
                        className="video-thumbnail"
                      />
                      <div className="play-button-overlay">
                        <div className="play-icon">▶</div>
                      </div>
                    </div>
                    <div className="video-info">
                      <h3 className="video-title">{video.snippet.title}</h3>
                      <p className="video-description">
                        {video.snippet.description.substring(0, 100)}...
                      </p>
                    </div>
                  </a>
                </ScrollReveal>
              );
            })}
          </div>
        )}
        <ScrollReveal animation="slide-up" delay={0.2}>
          <div className="section-footer">
            <a href="https://www.youtube.com/channel/UCe-tn8Fc3EN-g4qWaSJ_uIA" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              View All Videos
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default VideoSection;
