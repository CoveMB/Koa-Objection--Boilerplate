const Koa = require('koa');
const bodyParser = require('koa-bodyparser')();
const compress = require('koa-compress')();
const { errorEvent, errorHandler } = require('config/errors/errorEvent');
const registerRouters = require('api');
const { log, cors, error } = require('globalMiddlewares');

/**
 * Create app
*/
const app = new Koa();

/**
 * Register global middlewares
*/
app.use(bodyParser) // Parse the body request
  .use(log)         // Log every logRequests
  .use(error)       // Handle trowed errors
  .use(cors)        // Configure cors
  .use(compress);   // Allow compress

/**
 * Register events
*/
app.on(errorEvent, errorHandler);

/**
 * Apply global router
*/
const server = registerRouters(app);

module.exports = server;
