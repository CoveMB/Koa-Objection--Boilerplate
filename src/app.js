require('app-module-path').addPath(`${__dirname}/`);
const connectDB = require('config/database');
const { appName } = require('config/variables');
const { port } = require('config/variables').server;
const logger = require('config/logger');
const { Model } = require('objection');
const configServer = require('config/server');

const bootstrap = async serverApp => {

  /**
  * Connect database
  * It's important that the database is initialized first
  * to bind the Objection's model to the knex instance
  */
  const knex = await connectDB();

  /**
 * Bind knex instance config with Objection's model
 */
  Model.knex(knex);

  /**
 * Configure the server and it's routes
 */
  const server = configServer();

  /**
 * Start the app
 */
  server.listen(port);

};

// Start the app
(async() => {

  try {

    const app = await bootstrap();

    logger.info(`🛩  ${appName} is listening on port ${port}, let's play!`);

  } catch (error) {

    setImmediate(() => {

      logger.error('Unable to run the server because of the following error:');
      logger.error(error.message);

      process.exit();

    });

  }

})();
