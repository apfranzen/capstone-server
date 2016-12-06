exports.up = function(knex, Promise) {
  return knex.schema.createTable('pictures', (table) => {
    table.increments();
    table.varchar('project');
    table.varchar('room');
    table.varchar('level');
    table.varchar('orientation');
    table.varchar('pic_url');
    table.boolean('main');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pictures');
};
