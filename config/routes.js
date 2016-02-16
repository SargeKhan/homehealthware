
/**
 * Module dependencies.
 */

var home = require('../app/controllers/home');
var authenticate = require('./token-auth/index');
var user = require('../app/controllers/user.js');
var company = require('../app/controllers/company.js');
var crypto = require('crypto')


/**
 * Expose
 */
module.exports = function (app) {

  app.post('/createUser', user.createUser);
  app.get('/company/:id', authenticate.ensureAuthentication, company.getCompany);
  app.post('/createCompany', authenticate.ensureAuthentication, authenticate.isPermitted, company.createCompany);
  app.post('/login', user.login);
  app.get('/requiresAuthentication', authenticate.ensureAuthentication, home.authenticateView);
  app.post('/changePassword', user.changePassword);
  app.post('/reset/:token', user.reset);

  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }

    console.error(err.stack);
    // error page
    res.status(500).send( { type: false, error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res) {
    res.status(404).send({
      type: false,
      error: 'Not found' + req.originalUrl
    });
  });

};
