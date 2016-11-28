const express = require('express');
const router = express.Router();
// const cloudinary = require('./cloudinary.js');
const knex = require('../db/knex');
const axios = require('axios');
var cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

/* get picures from db */
// router.get('/', (req, res, next) => {
//   return knex('pictures').select('*')
//   .then((pictures) => {
//     console.log('pictures: ', pictures);
//     res.status(200).json({
//       status: 'success',
//       data: pictures
//     });
//   })
//   .catch((err) => {
//     console.log('err: ', err);
//     return next(err); });
// });

/* get picures from cloudinary */
router.get('/', (req, res, next) => {
  console.log('get pictures hit');
  // cloudinary.api.resources_by_tag("mytag", function(result){});
  // var pictures = cloudinary.url("gsqcphwyzxruysovuh0v.jpg");

  cloudinary.api.resources_by_tag("1001", function(result){
    console.log(result.resources);
    res.json(result.resources)
  });



  // cloudinary.api.resources_by_tag("mytag", function(result){});
  // axios.get('https://447252371969227:V-FVFFtZ3P6QOxWwudo3caL1998@api.cloudinary.com/v1_1/apfranzen/resources/image/tags/1001')
  // .then(function (response) {
  //   console.log(response.data.resources);
  //   res.json(response.data.resources);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
});

module.exports = router;
