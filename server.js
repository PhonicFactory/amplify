require('dotenv').config()
const express = require('express');
const routes = require('./routes/index');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/dist`));
routes(app);

/* istanbul ignore next */
if (!module.parent) {
    app.listen(process.env.PORT);
    console.log(`Express started on port ${process.env.PORT}`);
}
