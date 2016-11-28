const express = require('express');
const router = express.Router();
const knex = require('../db/knex');


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

module.exports = router;
