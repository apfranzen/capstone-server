exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('projects').insert({name: 'galvanize'}),
        knex('projects').insert({name: 'hospital'}),
        knex('projects').insert({name: 'data center'})
      ]);
    });
};
