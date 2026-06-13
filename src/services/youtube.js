const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
console.log("REACT_APP_YOUTUBE_API_KEY is:", API_KEY ? "Loaded Successfully" : "UNDEFINED - Please restart the server");
const CHANNEL_ID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID || 'UCe-tn8Fc3EN-g4qWaSJ_uIA'; // Default placeholder or use yours

const MOCK_VIDEOS = [
  {
    id: { videoId: 'ATLrHhNetGM' },
    snippet: {
      title: 'Build a Portfolio Website with CI/CD in 30 Minutes',
      description: 'In this project, I will show you how to host a website using GitHub Pages, automate deployments using GitHub Actions CI/CD...',
      thumbnails: { medium: { url: 'https://i2.ytimg.com/vi/ATLrHhNetGM/hqdefault.jpg' } }
    }
  },
  {
    id: { videoId: 'zkbYzdy9mTM' },
    snippet: {
      title: '🔥 Deloitte DevOps Interview | First Round Part 2',
      description: 'Deloitte Interview Questions & Answers – Part 2 | First Technical Round Experience',
      thumbnails: { medium: { url: 'https://i3.ytimg.com/vi/zkbYzdy9mTM/hqdefault.jpg' } }
    }
  },
  {
    id: { videoId: 'HtLZZ4BHXgk' },
    snippet: {
      title: '🚀 AWS Interview Question & Answers Part 4',
      description: 'AWS Interview Questions & Answers – Part 4 | AWS Compute Series',
      thumbnails: { medium: { url: 'https://i1.ytimg.com/vi/HtLZZ4BHXgk/hqdefault.jpg' } }
    }
  },
  {
    id: { videoId: 'dummy4' },
    snippet: {
      title: 'Kubernetes for Beginners',
      description: 'Learn Kubernetes from scratch in this comprehensive tutorial.',
      thumbnails: { medium: { url: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80' } }
    }
  }
];

const MOCK_PLAYLISTS = [
  {
    id: 'mock_pl_1',
    snippet: {
      title: 'DevOps & Cloud Projects',
      description: 'Hands-on projects covering AWS, Terraform, CI/CD, and Kubernetes.',
      thumbnails: { medium: { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80' } }
    }
  },
  {
    id: 'mock_pl_2',
    snippet: {
      title: 'Interview Preparation Series',
      description: 'Real-world interview questions for Deloitte, Accenture, and more.',
      thumbnails: { medium: { url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80' } }
    }
  }
];

export const fetchLatestVideos = async () => {
  if (API_KEY) {
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=15`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      
      const filtered = data.items.filter(item => {
        const title = item.snippet.title.toLowerCase();
        const desc = item.snippet.description.toLowerCase();
        return item.id.kind === 'youtube#video' && !title.includes('#short') && !desc.includes('#short');
      });
      return filtered.slice(0, 4);
    } catch (error) {
      console.error('Error fetching from YouTube API:', error);
    }
  }

  // Fallback: Fetch automatically without API key using RSS to JSON
  try {
    const rssUrl = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`);
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
    if (!response.ok) throw new Error('Failed to fetch from RSS to JSON');
    const data = await response.json();

    if (data.status === 'ok' && data.items) {
      const filteredRss = data.items.filter(item => {
        const title = item.title.toLowerCase();
        const desc = (item.description || '').toLowerCase();
        return !title.includes('#short') && !desc.includes('#short');
      });

      return filteredRss.slice(0, 4).map(item => ({
        id: { videoId: item.guid.split(':')[2] },
        snippet: {
          title: item.title,
          description: item.description || 'Watch this video on DevFusion Mastery!',
          thumbnails: { medium: { url: item.thumbnail } }
        }
      }));
    }
  } catch (error) {
    console.error('Error fetching from RSS:', error);
  }

  console.warn('All fetch methods failed. Using mock data.');
  return MOCK_VIDEOS;
};

export const fetchPlaylists = async () => {
  if (API_KEY) {
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/playlists?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&maxResults=6`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error('Error fetching playlists from YouTube API:', error);
    }
  }

  console.warn('YouTube API Key not found. Using mock playlists.');
  return MOCK_PLAYLISTS;
};

export const fetchChannelStats = async () => {
  if (API_KEY) {
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        return data.items[0].statistics;
      }
    } catch (error) {
      console.error('Error fetching channel stats:', error);
    }
  }
  return null;
};
