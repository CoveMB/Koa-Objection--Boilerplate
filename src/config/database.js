const Knex = require('knex');
const logger = require('config/logger');
const { Model } = require('objection');
const { ConfigError } = require('config/errors/errorTypes');

const connect = () => {

  const knexConfig = require('../../knexfile')(); // eslint-disable-line

  return async val => {

    try {

      // Connect knex to db
      const knex = await new Knex(knexConfig);

      // This little query make sure the connection is established
      await knex.select(knex.raw('1'));

      Model.knex(knex);

      return knex;

    } catch (error) {

      throw new ConfigError(`Could not connect to the db, ${error}`);

    }

  };

};

const connectDB = connect();

module.exports = connectDB;
