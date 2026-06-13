import React, { useEffect, useState } from 'react';
import { fetchPlaylists } from '../services/youtube';
import './PlaylistsSection.css';

const PlaylistsSection = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlaylists = async () => {
      const data = await fetchPlaylists();
      setPlaylists(data);
      setLoading(false);
    };
    loadPlaylists();
  }, []);

  return (
    <section id="playlists" className="section playlists-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Curated <span className="text-gradient">Playlists</span></h2>
          <p className="section-subtitle">Explore my content categorized by series</p>
        </div>

        {loading ? (
          <div className="loading-state">Loading playlists...</div>
        ) : (
          <div className="playlists-grid">
            {playlists.map((playlist) => (
              <a 
                href={`https://www.youtube.com/playlist?list=${playlist.id}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                key={playlist.id}
                className="playlist-card glass-card"
              >
                <div className="playlist-thumbnail-container">
                  <img 
                    src={playlist.snippet.thumbnails.medium.url} 
                    alt={playlist.snippet.title} 
                    className="playlist-thumbnail"
                  />
                  <div className="playlist-overlay">
                    <div className="playlist-icon">🔀</div>
                    <span>View Full Playlist</span>
                  </div>
                </div>
                <div className="playlist-info">
                  <h3 className="playlist-title">{playlist.snippet.title}</h3>
                  <p className="playlist-description">
                    {playlist.snippet.description ? playlist.snippet.description.substring(0, 100) + '...' : 'Dive into this series!'}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PlaylistsSection;
