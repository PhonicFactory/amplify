const catchall = require('./catchall');
const auth = require('./auth');

module.exports = (app) => {
    app.use('/', catchall);
    app.use('/auth', auth);
};
