import React, { useEffect, useState } from 'react';
import { fetchLatestVideos } from '../services/youtube';
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

  return (
    <section id="videos" className="section video-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Latest <span className="text-gradient">Tutorials</span></h2>
          <p className="section-subtitle">Watch the newest videos from DevFusion Mastery</p>
        </div>

        {loading ? (
          <div className="loading-state">Loading videos...</div>
        ) : (
          <div className="video-grid">
            {videos.map((video, index) => {
              if (index === 0 || index === 1) {
                return (
                  <div key={video.id.videoId} className="video-card glass-card">
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
                );
              }

              return (
                <a 
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  key={video.id.videoId}
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
              );
            })}
          </div>
        )}
        <div className="section-footer">
          <a href="https://www.youtube.com/channel/UCe-tn8Fc3EN-g4qWaSJ_uIA" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            View All Videos
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
