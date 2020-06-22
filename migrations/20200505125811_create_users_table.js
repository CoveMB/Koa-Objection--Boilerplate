
exports.up = function(knex) {

  return knex.schema
    .createTable('user', table => {

      table.increments('id').unsigned()
        .primary();
      table.boolean('admin').defaultTo(false);
      table.string('email')
        .unique()
        .notNullable();
      table.string('password').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(null);

    })

    .createTable('token', table => {

      table.increments('id').unsigned()
        .primary();
      table.string('token').notNullable();
      table
        .integer('user_id')
        .unsigned()
        .references('user.id')
        .inTable('user')
        .onDelete('CASCADE')
        .index();
      table.dateTime('expiration').nullable();
      table.string('device').nullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(null);

    });

};

exports.down = function(knex) {

  return knex.schema
    .dropTableIfExists('token')
    .dropTableIfExists('user');

};
