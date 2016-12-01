var faker = require('faker');

exports.seed = function(knex, Promise) {
  let numberOfArrays = new Array(100);
  let arrayOfPictures = Array.from(numberOfArrays).map(() => {
    return generatePictures(knex);
  });
  return Promise.all(arrayOfPictures);
};

function generatePictures (knex) {
  return knex('pictures')
  .insert({
    filename: 'img' + faker.random.number({min:1, max:100}) + '.jpg',
    project: faker.commerce.color(),
    level: faker.random.number({min:1, max:4}),
    room: faker.random.number({min:1980, max:2020}),
    pic_url: faker.image.imageUrl(),
    user_id: faker.random.number({min:1, max:10})
  });
}
