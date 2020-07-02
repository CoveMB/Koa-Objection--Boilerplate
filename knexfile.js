require('app-module-path').addPath(`${__dirname}/src`);
const { ConfigError } = require('config/errors/error.types');
const {
  dbHost, dbPort, dbUser, dbPassword, dbName
} = require('./src/config/variables');

module.exports = (configType = 'production') => {

  if (configType === 'production') {

    return {
      client    : 'pg',
      connection: {
        host    : dbHost || 'localhost',
        port    : dbPort || 5432,
        user    : dbUser || 'postgres',
        password: dbPassword || undefined,
        database: dbName
      },
      migrations: {
        directory: 'migrations',
      },
      searchPath: [ 'knex', 'public' ],
    };

  }

  if (configType === 'test') {

    return {
      client    : 'pg',
      connection: {
        host    : dbHost || 'localhost',
        port    : dbPort || 5432,
        user    : dbUser || 'postgres',
        password: dbPassword || undefined,
        database: `${dbName}-test`
      },
      migrations: {
        directory: 'migrations',
      },
      searchPath: [ 'knex', 'public' ],
    };

  }

  throw new ConfigError('Please select a proper database config type');

};
