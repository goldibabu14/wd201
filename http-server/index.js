const http = require('http');
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));
const port = args.port || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/home') {
    fs.readFile(path.join(__dirname, 'home.html'), (err, data) => {
      if (err) {
        res.statusCode = 500;
        return res.end('Error loading home.html');
      }
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    });
  } else if (req.url === '/project' || req.url === '/projects') {
    fs.readFile(path.join(__dirname, 'project.html'), (err, data) => {
      if (err) {
        res.statusCode = 500;
        return res.end('Error loading project.html');
      }
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    });
  } else if (req.url === '/registration') {
    fs.readFile(path.join(__dirname, 'registration.html'), (err, data) => {
      if (err) {
        res.statusCode = 500;
        return res.end('Error loading registration.html');
      }
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    });
  } else {
    res.statusCode = 404;
    res.end('Page not found');
  }
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
