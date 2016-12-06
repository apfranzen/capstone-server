const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
var cloudinary = require('cloudinary');
var moment = require('moment');

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
    res.status(200).json({
      status: 'success',
      data: payload
    });
  })
  .catch((err) => {
    console.log('err: ', err);
    return next(err); });
});

/* get picures from db */
router.get('/:project', (req, res, next) => {
  let project = req.params.project
  return knex('pictures')
  .where({
    project: project
  })
  .select('*')
  .then((pictures) => {
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
  console.log('room: ', room, 'project: ', project);
  return knex('pictures')
  .where({
    project: project,
    room: room
  })
  .select('*')
  .then((pictures) => {
    console.log(pictures);
    res.status(200).json({
      status: 'success',
      data: pictures
    });
  })
  .catch((err) => {
    console.log('err: ', err);
    return next(err);
  });
});
// Get large picture
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
