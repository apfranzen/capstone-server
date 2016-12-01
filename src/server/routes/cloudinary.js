const axios = require('axios');

exports.getPictures = function() {
  console.log('cloudinary.getPictures is hit');
  return axios.get('https://447252371969227:V-FVFFtZ3P6QOxWwudo3caL1998@api.cloudinary.com/v1_1/apfranzen/resources/image');
};
