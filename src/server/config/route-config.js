(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const pictures = require('../routes/pictures');
    const projects = require('../routes/projects');
    const inbound = require('../routes/inbound');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/pictures', pictures);
    app.use('/projects', projects);
    app.use('/inbound', inbound);
  };

})(module.exports);
