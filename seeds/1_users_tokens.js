
const {
  THIRD_PARTY_PASSWORD,
  THIRD_PARTY_TOKEN,
  ADMIN_PASSWORD,
  ADMIN_TOKEN,
  USER_PASSWORD,
  USER_TOKEN,
} = process.env;

exports.seed = function(knex) {

  // Deletes ALL existing entries
  return knex('users').del()
    .then(() =>

      // Inserts seed entries
      knex('users').insert([
        {
          email   : 'thirdparty@email.com',
          admin   : false,
          password: THIRD_PARTY_PASSWORD
        },
        {
          email   : 'admin@email.com',
          admin   : false,
          password: ADMIN_PASSWORD
        },
        {
          email   : 'user@email.com',
          admin   : false,
          password: USER_PASSWORD
        },
      ])
    )
    .then(() =>
      knex('tokens').del())
    .then(() =>

    // Inserts seed entries
      knex('tokens').insert([

        {
          token  : THIRD_PARTY_TOKEN,
          user_id: 1
        },
        {
          token  : ADMIN_TOKEN,
          user_id: 2
        },
        {
          token  : USER_TOKEN,
          user_id: 3
        }
      ])
    );

};
