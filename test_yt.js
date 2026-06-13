const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || 'AIzaSyDj8YMChAu8w1Pf4ZZHX7D6C34egvp0OKM';
const CHANNEL_ID = 'UCe-tn8Fc3EN-g4qWaSJ_uIA';

async function testFetch() {
  console.log("Fetching API...");
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=15&q=-#shorts`;
    console.log("URL:", url);
    const response = await fetch(url);
    const data = await response.json();
    console.log("API Response Items Count:", data.items ? data.items.length : data);
    
    if (data.items) {
      const filtered = data.items.filter(item => {
        const title = (item.snippet && item.snippet.title) ? item.snippet.title.toLowerCase() : '';
        const desc = (item.snippet && item.snippet.description) ? item.snippet.description.toLowerCase() : '';
        return item.id.kind === 'youtube#video' && !title.includes('#short') && !desc.includes('#short');
      });
      console.log("Filtered length:", filtered.length);
    }
  } catch (e) {
    console.error("API Error", e);
  }

  console.log("Fetching RSS...");
  try {
    const rssUrl = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`);
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
    const data = await response.json();
    console.log("RSS Items count:", data.items ? data.items.length : data);
  } catch(e) {
    console.error("RSS Error", e);
  }
}
testFetch();
