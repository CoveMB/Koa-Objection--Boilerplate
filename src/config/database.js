const Knex = require('knex');
const { Model } = require('objection');
const logger = require('./logger');

const connect = () => {

  const knexConfig = require('../../knexfile'); // eslint-disable-line

  return async() => {

    try {

      const pg = await new Knex(knexConfig);

      Model.knex(pg);

    } catch (error) {

      logger.error('Could not connect to the db: ', error);

    }

  };

};

const connectDB = connect();

module.exports = connectDB;
