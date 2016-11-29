const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});


/* get picures from cloudinary */
router.get('/', (req, res, next) => {
  knex('projects').select('*')
  .then((projects) => {
    res.status(200).json({
      status: 'success',
      data: projects
    });
  })
  .catch((err) => { return next(err); });
});

router.get('/:project', (req, res, next) => {
  console.log('server hit');
  let project = req.params.project;
  console.log(project);
  // cloudinary.api.resources_by_tag("1001", function(result){
  //   console.log(result.resources);
  //   res.json(result.resources)
  // });
})

module.exports = router;
