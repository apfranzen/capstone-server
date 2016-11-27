exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.varchar('username');
    table.varchar('first_name');
    table.varchar('last_name');
    table.varchar('email');
    table.varchar('password');
    table.varchar('affiliation');
    table.varchar('company');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
