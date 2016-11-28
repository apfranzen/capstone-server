var faker = require('faker');

exports.seed = function(knex, Promise) {
  let numberOfArrays = new Array(100);
  let arrayOfProjects = Array.from(numberOfArrays).map(() => {
    return generateProjects(knex);
  });
  return Promise.all(arrayOfProjects);
};

function generateProjects (knex) {
  return knex('projects')
  .insert({
    project: faker.commerce.color()
  });
}
