require('app-module-path').addPath(`${__dirname}/`);
const connectDB = require('./config/database');
const http = require('http');
const { appName } = require('./config/variables');
const { port } = require('./config/variables').server;
const logger = require('./config/logger');
const server = require('./config/server');

const bootstrap = async serverApp => {

  /**
   * Add external services init as async operations (db, redis, etc...)
   */

  await connectDB();

  return http.createServer(serverApp.callback()).listen(port);

};

// Start the app
(async() => {

  try {

    const app = await bootstrap(server);

    logger.info(`🛩  ${appName} is listening on port ${app.address().port}, let's play!`);

  } catch (error) {

    setImmediate(() => {

      logger.error('Unable to run the server because of the following error:');
      logger.error(error);
      process.exit();

    });

  }

})();
