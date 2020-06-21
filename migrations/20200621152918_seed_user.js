
exports.up = function(knex) {

  return knex.seed.run({ specific: '1_users_tokens.js' });

};

exports.down = async function(knex) {

  return knex('token').truncate()
    .then(() => {

      knex('user').truncate();

    });

};
