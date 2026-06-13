require('dotenv').config();
const fs = require('fs');
const https = require('https');

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID || 'UCe-tn8Fc3EN-g4qWaSJ_uIA';

async function downloadChannelIcon() {
  if (!API_KEY) {
    console.error("No API key found in .env");
    return;
  }
  const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${CHANNEL_ID}&key=${API_KEY}`;
  
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const parsed = JSON.parse(data);
      if (parsed.items && parsed.items.length > 0) {
        const iconUrl = parsed.items[0].snippet.thumbnails.high.url;
        console.log("Found channel icon:", iconUrl);
        
        const file = fs.createWriteStream('./public/favicon.jpg');
        https.get(iconUrl, (response) => {
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log("Favicon downloaded successfully to public/favicon.jpg");
          });
        });
      } else {
        console.error("Channel not found or API error", parsed);
      }
    });
  }).on('error', (err) => {
    console.error("Error:", err.message);
  });
}

downloadChannelIcon();
