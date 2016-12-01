exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pictures').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('pictures').insert({project: 'galvanize', room: 'classroom', pic_url: 'galvanize/IMG_20161130_104001', orientation: 'north', main: true}),
        knex('pictures').insert({project: 'galvanize', room: 'classroom', pic_url: 'galvanize/IMG_20161130_104010', orientation: 'west'}),
        knex('pictures').insert({project: 'galvanize', room: 'classroom', pic_url: 'galvanize/IMG_20161130_104016', orientation: 'south'}),
        knex('pictures').insert({project: 'galvanize', room: 'classroom', pic_url: 'galvanize/IMG_20161130_104026', orientation: 'east'}),
        // hospital
        knex('pictures').insert({project: 'hospital', room: 'patient room', pic_url: 'hospital/hospital-550x226', orientation: 'east', main: true}),
        // data center
        knex('pictures').insert({project: 'data center', room: 'lobby', pic_url: 'data_center/commercialconstructionbuilding-160305113118-thumbnail-4', orientation: 'east', main: true})
      ]);
    });
};
