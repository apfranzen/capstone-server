const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

router.get('/', (req, res, next) => {
  return knex('pictures').select('*')
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

module.exports = router;
