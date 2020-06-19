// bcrypt is included in the objection-password package
const bcrypt = require('bcrypt');

const {
  ADMIN_TOKEN,
  USER_TOKEN,
} = process.env;

const password = bcrypt.hashSync(process.env.INITIAL_PASSWORD, 12);

exports.seed = function(knex) {

  // Deletes ALL existing entries
  return knex('users').del()
    .then(() =>

    // You need to set your jwt token before
      // Inserts seed entries
      knex('users').insert([
        {
          email: 'admin@email.com',
          admin: false,
          password
        },
        {
          email: 'user@email.com',
          admin: false,
          password
        },
      ])
    )
    .then(() =>
      knex('tokens').del())
    .then(() =>

    // Inserts seed entries
      knex('tokens').insert([
        {
          token  : ADMIN_TOKEN,
          user_id: 1
        },
        {
          token  : USER_TOKEN,
          user_id: 2
        }
      ])
    );

};
