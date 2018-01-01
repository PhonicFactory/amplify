const catchall = require('./catchall');
const auth = require('./auth');

module.exports = (app) => {
    app.use('/auth', auth);
    app.use('/', catchall);
};
