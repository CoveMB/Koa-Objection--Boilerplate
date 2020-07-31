require('app-module-path').addPath(`${__dirname}/src`);
const { ConfigError } = require('config/errors/error.types');
const { knexSnakeCaseMappers } = require('objection');
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
      searchPath: [ 'knex', 'public' ],
      ...knexSnakeCaseMappers()
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
      searchPath: [ 'knex', 'public' ],
      ...knexSnakeCaseMappers()
    };

  }

  throw new ConfigError('Please select a proper database config type');

};
