
exports.up = function(knex) {

  return knex.schema
    .createTable('users', table => {

      table.increments('id').unsigned()
        .primary();
      table.boolean('admin').defaultTo(false);
      table.string('email').notNullable();
      table.string('password').notNullable();

    })

    .createTable('tokens', table => {

      table.increments('id').unsigned()
        .primary();
      table.string('token').notNullable();
      table
        .integer('userId')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
        .index();

    });

};

exports.down = function(knex) {

  return knex.schema
    .dropTableIfExists('tokens')
    .dropTableIfExists('users');

};
