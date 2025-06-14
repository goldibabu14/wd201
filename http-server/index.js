const http = require('http');
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));
const port = args.port || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/home') {
    serveFile('home.html', res);
  } else if (req.url === '/project') {
    serveFile('project.html', res);
  } else if (req.url === '/registration') {
    serveFile('registration.html', res);
  } else if (req.method === 'POST' && req.url === '/register') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      console.log('Received registration data:', body);
      res.statusCode = 200;
      res.end('Registration successful');
    });
  } else {
    res.statusCode = 404;
    res.end('Page not found');
  }
});

function serveFile(filename, res) {
  fs.readFile(path.join(__dirname, filename), (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end(`Error loading ${filename}`);
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    }
  });
}

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
