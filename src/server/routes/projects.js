const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

router.get('/', (req, res, next) => {
  return knex.select('*')
  .from('projects')
  .join('pictures', 'projects.name', '=', 'pictures.project')
  .where('main', true)
  .select('projects.name', 'pictures.pic_url')
  .then((payload) => {
    console.log('payload: ', payload);
    res.status(200).json({
      status: 'success',
      data: payload
    });
  })
  .catch((err) => {
    console.log('err: ', err);
    return next(err); });
});
// router.get('/', (req, res, next) => {
//   knex('projects').select('*')
//   .then((projects) => {
//     // console.log(projects[0].project);
//     let pictures = projects.map((project) => {
//       // console.log(project.project);
//         return cloudinary.api.resources_by_tag(project.project, function(result){
//           // console.log(result.resources[0].public_id);
//         });
//       })
//
//     Promise.all(pictures)
//     .then((response) => {
//       // console.log(response[0]);
//       // let pictures = response.map((array) => {
//       //   return array.resources[0].public_id;
//       // })
//       // return pictures;
//     })
//
//     res.status(200).json({
//       status: 'success',
//       data: projects, pictures
//     });
//   })
//   .catch((err) => { return next(err); });
// });

// /* get picures from cloudinary */
// router.get('/', (req, res, next) => {
//   knex('projects').select('*')
//   .then((projects) => {
//     return Promise.all(projects.map(project => {
//       return requestToCloudinary(project.project).then(cloudinaryResponse => {
//         project.image = cloudinaryResponse.resources[0]
//         return project
//       })
//     }))
//
//     // [Promise, Promise, Promise]
//
//     // res.status(200).json({
//     //   status: 'success',
//     //   data: projects
//     // });
//   }).then((usersAndProjects) => {})
//   .catch((err) => { return next(err); });
// });

// router.get('/:project', (req, res, next) => {
//   console.log('server hit');
//   let project = req.params.project;
//   console.log(project);
//   cloudinary.api.resources_by_tag(project, function(result){
//     console.log(result);
//     res.send(result)
//   });
// })

/* get picures from db */
router.get('/:project', (req, res, next) => {
  let project = req.params.project
  return knex('pictures')
  .where({
    project: project
  })
  .select('*')
  .then((pictures) => {
    console.log('pictures: ', pictures);
    res.status(200).json({
      status: 'success',
      data: pictures
    });
  })
  .catch((err) => {
    console.log('err: ', err);
    return next(err); });
});

router.get('/:project/:room', (req, res, next) => {
  let project = req.params.project
  let room = req.params.room
  return knex('pictures')
  .where({
    project: project,
    room: room
  })
  .select('*')
  .then((pictures) => {
    res.status(200).json({
      status: 'success',
      data:pictures
    });
  })
  .catch((err) => {
    console.log('err: ', err);
    return next(err);
  });
});

module.exports = router;
