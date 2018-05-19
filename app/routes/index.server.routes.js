// Load the 'users' controller
const index = require('../controllers/index.server.controller');
const feedback = require('../controllers/feedback.server.controller');
const user = require('../controllers/user.server.controller');

module.exports = function (app) {

    app.get('/', index.render);
    app.post('/feedback', user.userByUsername);
    app.post('/thankyou', feedback.create);
    app.get('/signup', index.renderSignup);
    app.post('/signup', user.create);
    app.get('/viewfeedback', feedback.list);
}