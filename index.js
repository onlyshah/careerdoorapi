const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
// Swagger setup


const server = http.createServer(app);

server.listen(port);
