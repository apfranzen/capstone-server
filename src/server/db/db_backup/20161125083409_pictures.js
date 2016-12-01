exports.up = function(knex, Promise) {
  return knex.schema.createTable('pictures', (table) => {
    table.increments();
    table.varchar('filename');
    table.varchar('project');
    table.varchar('level');
    table.varchar('room');
    table.varchar('pic_url');
    table.varchar('user_id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pictures');
};
