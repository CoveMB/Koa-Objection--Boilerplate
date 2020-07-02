const Koa = require('koa');
const bodyParser = require('koa-bodyparser')();
const compress = require('koa-compress')();
const { userAgent } = require('koa-useragent');
const cors = require('@koa/cors');
const { errorEvent, errorHandler } = require('config/errors/error.event');
const registerRouters = require('api');
const { log, error } = require('globalMiddlewares');
const { corsOptions } = require('config/cors');

/**
 * Create app
*/
const app = new Koa();

/**
 * Register global middlewares
*/

app.use(cors(corsOptions))    // Configure cors
  .use(userAgent)             // Attach user agent to the context
  .use(bodyParser)            // Parse the body request
  .use(log)                   // Log every logRequests
  .use(error)                 // Handle trowed errors
  .use(compress);             // Allow compress

/**
 * Register events
*/
app.on(errorEvent, errorHandler);

/**
 * Apply global router
*/
const server = registerRouters(app);

module.exports = server;
