exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', (table) => {
    table.increments();
    table.varchar('name');
    table.varchar('status');
    table.varchar('city');
    table.varchar('state');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('projects');
};
