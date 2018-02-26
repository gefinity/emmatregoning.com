const express   = require('express');
const path      = require('path');

const app = express();

// PROD:
app.use(express.static(path.join(__dirname, '_externalAssets')));
app.use(express.static(path.join(__dirname, 'static')));

// DEV:
// static assets will be in the project assets folder
app.use(express.static(path.join(__dirname, 'assets')));
// bundles:
app.use(express.static(path.join(__dirname, 'build/.tmp/static')));

const server = app.listen(8080, () => {
    const port = server.address().port;
    console.log('emmatregoning.com listening on: ' + port);
});