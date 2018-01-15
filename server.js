let compression = require('compression')
const path = require('path');
const express = require('express');

const app = express();

app.use(compression());
app.use(express.static(__dirname + '/public'));

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 14000, function () {
    console.log('listening');
});
