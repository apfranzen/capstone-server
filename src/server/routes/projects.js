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
    let mappedData = pictures.map(pic => {
    let picObj = {
      created_at: pic.created_at,
      pic_url: pic.pic_url,
      orientation: pic.orientation,
      main: pic.main
    };
    return {
      project: pic.project,
      room: pic.room,
      id: pic.id,
      level: pic.level,
      pics: [picObj]
    };
  });

  let reducedData = mappedData.reduce((out, curr) => {
    let found = out.find(item => item.room === curr.room && item.level === curr.level);

    if (found) {
      found.pics = found.pics.concat(curr.pics);
    } else {
      out.push(curr);
    }
    return out;
  }, []);
    // filter through and get unique rooms
    // var allRooms = [];
    // pictures.forEach((picture) => {
    //   allRooms.push(picture.room)
    // })
    // console.log('pictures from /:project route: ', pictures);
    // var uniqueRooms = allRooms.filter( onlyUnique );
    // // filter through and get unique levels
    // var allLevels = [];
    // pictures.forEach((picture) => {
    //   allLevels.push(picture.level)
    // })
    // var uniqueLevels = allLevels.filter( onlyUnique );
    // console.log('uniqueLevels: ', uniqueLevels );
    res.status(200).json({
      status: 'success',
      // levels: uniqueLevels,
      // rooms: uniqueRooms,
      data: reducedData
    });
  })
  .catch((err) => {
    console.log('err: ', err);
    return next(err); });
});

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

// usage example:
var a = ['a', 1, 'a', 2, '1'];

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
