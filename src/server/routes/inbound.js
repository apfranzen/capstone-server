const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
var cloudinary = require('cloudinary');

cloudinary.config({
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET
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

router.get('/:project/:room/:pic_url', (req, res, next) => {
  let project = req.params.project
  let room = req.params.room
  let pic_url = req.params.pic_url
  console.log('room: ', room, 'project: ', project, 'pic_url: ', pic_url);
  return knex('pictures')
  .where({
    project: project,
    room: room,
    pic_url: pic_url
  })
  .select('*')
  .then((picture) => {
    console.log(picture);
    var date = moment(picture[0].created_at).format('LLLL');
    res.status(200).json({
      status: 'success',
      data: picture,
      date: date
    });
  })
  .catch((err) => {
    console.log('err: ', err);
    return next(err);
  });
});

module.exports = router;
