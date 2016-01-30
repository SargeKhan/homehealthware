
/**
 * Module dependencies.
 */

var home = require('../app/controllers/home');
var authenticate = require('./token-auth/index')

/**
 * Expose
 */

module.exports = function (app) {
  app.get('/', home.index);
  app.get('/success', home.index);
  app.get('/failure', home.index);
  app.post('/createUser', home.createUser);
  app.get('/createCompany',home.createCompany);
  app.post('/login', home.login);
  app.get('/requiresAuthenticaton', authenticate.ensureAuthentication, home.authenticateView)
  app.get('/authenticated', authenticate.ensureAuthentication, home.authenticateView)

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
