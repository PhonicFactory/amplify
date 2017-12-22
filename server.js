require('dotenv').config()
const express = require('express');
const app = express();

app.use(express.static(`${__dirname}/dist`));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

/* istanbul ignore next */
if (!module.parent) {
    app.listen(process.env.PORT);
    console.log(`Express started on port ${process.env.PORT}`);
}
