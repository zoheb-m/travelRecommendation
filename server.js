const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (not recommended for production)
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Check if the request is for travel_recommendation_api.json
    if (req.url === '/travel_recommendation_api.json' && req.method === 'GET') {
        const filePath = path.join(__dirname, 'travel_recommendation_api.json');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                res.writeHead(500);
                res.end('Error reading file');
            } else {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(data);
            }
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
