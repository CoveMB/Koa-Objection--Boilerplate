const Knex = require('knex');
const { ConfigError } = require('config/errors/error.types');

const connect = () => {

  const knexConfig = require('../../knexfile')(); // eslint-disable-line

  return async val => {

    try {

      // Connect knex to db
      const knex = await new Knex(knexConfig);

      // This little query make sure the connection is established
      await knex.select(knex.raw('1'));

      return knex;

    } catch (error) {

      throw new ConfigError(`Could not connect to the db, ${error}`);

    }

  };

};

const connectDB = connect();

module.exports = connectDB;
