const {
  dbHost, dbPort, dbUser, dbPassword, dbName
} = require('./src/config/variables');

module.exports = {
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
