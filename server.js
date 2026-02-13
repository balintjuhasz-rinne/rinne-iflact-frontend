// TODO!!!
// the server currently doesn't used
// but if you want to use it you should fix FIX THE PROBLEM with status code!!!!!!!!
// currently only 404 status code will not cached but event 302 status will cached!!
// update 27 line to avoid caching any responses with non 20X status code

const cacheableResponse = require('cacheable-response');
const express = require('express');
const next = require('next');
const config = require('config');
const { Mutex } = require('async-mutex');
const cookieParser = require('cookie-parser');

const port = parseInt(process.env.PORT, 10);
const app = next({ dev: false }); // only for prod mode
const handle = app.getRequestHandler();
const mutexMap = {};

const getSrrCache = (ttl) => cacheableResponse({
  ttl,
  get: async ({ req, res }) => {

    const data = await app.renderToHTML(req, res, req.path, {
      ...req.query,
      ...req.params,
    });
    if (res.statusCode === 404) {
      res.end(data);
      return {};
    }
    return { data };
  },
  send: ({ data, res }) => res.send(data),
});

const noStaticCache = getSrrCache(config.TTL_NO_STATIC);

const lockWrapper = async (req, res, typeCash) => {
  if (!mutexMap[req.originalUrl]) {
    mutexMap[req.originalUrl] = new Mutex();
  }
  const release = await mutexMap[req.originalUrl].acquire();
  try {
    await typeCash({ req, res });
  } finally {
    release();
  }
};
console.log('This?');
app.prepare().then(() => {
  const server = express();

  server.use(cookieParser());

  server.get('/', (req, res) => { console.log('Reqest', req); lockWrapper(req, res, noStaticCache); });
  server.get('*', (req, res) => { console.log('Reqest', req); handle(req, res); });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on: ${port}`);
  });
});
