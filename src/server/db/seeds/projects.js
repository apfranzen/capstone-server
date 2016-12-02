exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('projects').insert({name: 'Galvanize'}),
        knex('projects').insert({name: 'Hospital'}),
        knex('projects').insert({name: 'Data Center'})
      ]);
    });
};
