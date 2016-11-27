(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const pictures = require('../routes/pictures');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/pictures', pictures);
  };

})(module.exports);
