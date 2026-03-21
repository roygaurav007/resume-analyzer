const https = require('https');

const apiKey = 'AIzaSyCBBvUzwDoLPGladmBss4zZ1F9sA1Kfam0';
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const models = JSON.parse(data).models;
    models.forEach(m => console.log(m.name));
  });
}).on('error', e => console.log(e.message));