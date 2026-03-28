import https from 'https';
https.get('https://www.youtube.com/results?search_query=virgin+hyperloop+passenger+test', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
    if(match) console.log(match[1]);
    else console.log('not found');
  });
});
