exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('projects').insert({
          name: 'Galvanize',
          status: 'In Progress',
          city: 'Denver',
          state: 'CO'
        }),
        knex('projects').insert({
          name: 'Hospital',
          status: 'In Progress',
          city: 'Chicago',
          state: 'IL'
        }),
        knex('projects').insert({
          name: 'Data Center',
          status: 'Complete',
          city: 'Fort Collins',
          state: 'CO'
        })
      ]);
    });
};
