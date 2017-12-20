const express = require('express');
const config = require('./config');
const app = express();

app.use(express.static(`${__dirname}/dist`));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

/* istanbul ignore next */
if (!module.parent) {
    app.listen(config.dev.port);
    console.log(`Express started on port ${config.dev.port}`);
}
