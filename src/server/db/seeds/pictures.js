exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pictures').del()
    .then(function () {
      return Promise.all([
        // Galvanize
          // Classroom
        knex('pictures').insert(
          {
            project: 'Galvanize',
            room: 'Classroom',
            pic_url: 'IMG_20161130_104001',
            orientation: 'north',
            main: true
          }),
        knex('pictures').insert({project: 'Galvanize', room: 'Classroom', pic_url: 'IMG_20161130_104010', orientation: 'west'}),
        knex('pictures').insert({project: 'Galvanize', room: 'Classroom', pic_url: 'IMG_20161130_104016', orientation: 'south'}),
        knex('pictures').insert({project: 'Galvanize', room: 'Classroom', pic_url: 'IMG_20161130_104026', orientation: 'east'}),
          // Gym
        knex('pictures').insert({project: 'Galvanize', room: 'Gym', pic_url: 'IMG_20161202_093148', orientation: 'south'}),
        knex('pictures').insert({project: 'Galvanize', room: 'Gym', pic_url: 'IMG_20161202_093158', orientation: 'east'}),
        knex('pictures').insert({project: 'Galvanize', room: 'Gym', pic_url: 'IMG_20161202_093205', orientation: 'north'}),
        knex('pictures').insert({project: 'Galvanize', room: 'Gym', pic_url: 'IMG_20161202_093224', orientation: 'west'}),
        // hospital
        knex('pictures').insert({project: 'Hospital', room: 'Patient Room', pic_url: 'hospital-550x226', orientation: 'east', main: true}),
        // data center
        knex('pictures').insert({project: 'Data Center', room: 'Lobby', pic_url: 'commercialconstructionbuilding-160305113118-thumbnail-4', orientation: 'east', main: true})
      ]);
    });
};
