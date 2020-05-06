const Koa = require('koa');
const bodyParser = require('koa-bodyparser')();
const compress = require('koa-compress')();

const { errorEvent, errorHandler } = require('errors/errorEvent');

const registerRouters = require('api');
const { log, cors, error } = require('globalMiddlewares');

/**
 * Create app
*/
const app = new Koa();

/**
 * Register global middlewares
*/
app.use(log)        // Log every logRequests
  .use(error)       // Handle trowed errors
  .use(cors)        // Configure cors
  .use(compress)    // Allow compress
  .use(bodyParser); // Parse the body request

/**
 * Register events
*/
app.on(errorEvent, errorHandler);

/**
 * Apply global router
*/
const server = registerRouters(app);

module.exports = server;
