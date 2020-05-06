const Knex = require('knex');
const { Model } = require('objection');

const connect = () => {

  const knexConfig = require('../../knexfile'); // eslint-disable-line

  return async() => {

    try {

      // Connect knex to db
      const pg = await new Knex(knexConfig);

      // This little query make sure the connection is established
      await pg.select(pg.raw('1'));

      Model.knex(pg);

    } catch (error) {

      throw new Error('Could not connect to the db: ');

    }

  };

};

const connectDB = connect();

module.exports = connectDB;
