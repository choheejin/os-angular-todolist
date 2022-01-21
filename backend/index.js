const http = require('http');
const app = require('./app');

const server = http.createServer(app);
server.listen(process.env.PORT);
server.on('listening', () => {
  const addr = server.address();
  console.log(`Server running on ${addr.address}${addr.port}`);
});