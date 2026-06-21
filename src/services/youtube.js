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

export const fetchPlaylistVideos = async (playlistName = 'Cloud & DevOps Projects') => {
  let playlistId = 'PL1Diib8No4nVdkEyTd2ipsoPbnFHX4I0l'; // Default fallback ID for 'Cloud & DevOps Projects'
  
  if (API_KEY) {
    try {
      // 1. Fetch playlists to find the matching one by title
      const playlistsResponse = await fetch(`https://www.googleapis.com/youtube/v3/playlists?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&maxResults=50`);
      if (playlistsResponse.ok) {
        const playlistsData = await playlistsResponse.json();
        const foundPlaylist = playlistsData.items?.find(
          item => item.snippet?.title?.toLowerCase() === playlistName.toLowerCase()
        );
        if (foundPlaylist) {
          playlistId = foundPlaylist.id;
        }
      }
      
      // 2. Fetch videos in that playlist
      const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${playlistId}&part=snippet,contentDetails&maxResults=50`);
      if (!response.ok) throw new Error('Playlist items fetch failed');
      const data = await response.json();
      
      const mappedVideos = data.items.map(item => {
        const description = item.snippet?.description || '';
        const title = item.snippet?.title || '';
        const videoId = item.snippet?.resourceId?.videoId;
        
        // Extract GitHub URL
        const githubMatch = description.match(/https?:\/\/(?:www\.)?github\.com\/[^\s\n\r,()]+/i);
        const githubUrl = githubMatch ? githubMatch[0] : null;
        
        // Extract Live Demo URL (e.g. "Live Demo: <url>", "Demo: <url>", or matching live urls other than channel links)
        const demoMatch = description.match(/(?:Live Demo|Demo):\s*(https?:\/\/[^\s\n\r,()]+)/i);
        let liveUrl = demoMatch ? demoMatch[0].replace(/(?:Live Demo|Demo):\s*/i, '') : null;
        
        // If liveUrl was not explicitly found using pattern, check if there are other websites linked
        if (!liveUrl) {
          const allUrls = description.match(/https?:\/\/[^\s\n\r,()]+/gi) || [];
          // Find first URL that is not github or devfusionmastry or youtube
          const fallbackUrl = allUrls.find(url => 
            !url.includes('github.com') && 
            !url.includes('youtube.com') && 
            !url.includes('youtu.be')
          );
          if (fallbackUrl) {
            liveUrl = fallbackUrl;
          }
        }

        // Extract Tags (hashtags)
        const hashTags = description.match(/#\w+/g) || [];
        const tags = hashTags.map(tag => tag.substring(1)).slice(0, 4); // Limit to top 4 tags, strip '#'
        
        // Default tags if none found
        const finalTags = tags.length > 0 ? tags : ['Cloud', 'DevOps', 'AWS'];
        
        return {
          id: videoId || item.id,
          title,
          description: description.split('\n')[0] || 'Dynamic DevOps/Cloud project tutorial.', // Use first line or summary
          fullDescription: description,
          image: item.snippet?.thumbnails?.maxres?.url || 
                 item.snippet?.thumbnails?.standard?.url || 
                 item.snippet?.thumbnails?.high?.url || 
                 item.snippet?.thumbnails?.medium?.url || 
                 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
          tags: finalTags,
          githubUrl,
          liveUrl,
          videoId
        };
      });
      return mappedVideos.reverse();
    } catch (error) {
      console.error('Error fetching playlist videos from API:', error);
    }
  }

  // Fallback / Mock behavior if API key not present or fails
  console.warn('Using mock data for playlist videos.');
  return [
    {
      id: 'OmDCts9N5cc',
      title: 'GitHub Actions CI/CD Project #2',
      description: 'Automate your deployments with this end-to-end GitHub Actions CI/CD project to host a portfolio website on GitHub Pages.',
      image: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
      tags: ['GitHub Actions', 'CI/CD', 'Web Hosting'],
      githubUrl: 'https://github.com/avinash-sharma-121/portfolio_testing',
      liveUrl: 'https://project2.devfusionmastry.xyz/',
      videoId: 'OmDCts9N5cc'
    },
    {
      id: 'TGKiJlpCFKo',
      title: 'Serverless Three-Tier Architecture Project',
      description: 'Deploy a Serverless Three-Tier Web Application on AWS using CloudFront, S3, API Gateway, Lambda, and DynamoDB.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
      tags: ['AWS', 'Serverless', 'Terraform'],
      githubUrl: 'https://github.com/avinash-sharma-121/serverless-three-tier',
      liveUrl: 'https://demo.devfusionmastry.xyz',
      videoId: 'TGKiJlpCFKo'
    }
  ];
};
