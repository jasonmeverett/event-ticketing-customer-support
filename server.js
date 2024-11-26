/**
 * This is a workaround to not being able to run `npm run dev` right from 
 * a Cloudera session. This needs to be investigated further.
 */


const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.CDSW_APP_PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

app.prepare().then(() => {
  const server = express();

  // Pass all requests to Next.js
  server.all('*', (req, res) => handle(req, res));

  server.listen(PORT, HOST, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${HOST}:${PORT}`);
  });
});
