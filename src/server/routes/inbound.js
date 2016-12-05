const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

router.post('/pic', (req, res, next) => {
  let room = req.body.room;
  let orientation = req.body.orientation;
  let pic_url = req.body.pic_url;
  let project = req.body.project;
  console.log('req: ', req.body);
  return knex('pictures')
  .insert(
    {
      room: room,
      orientation: orientation,
      pic_url: pic_url,
      project: project
  })
  .then((response) => {
    res.status(200).json({
      status: 'success',
      data: response
    });
  })
  .catch((err) => {
    console.log('err: ', err);
    return next(err); });
});

module.exports = router;
