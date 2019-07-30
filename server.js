const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/reddit-prototype-angular'));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/reddit-prototype-angular/index.html'));
});
app.listen(process.env.PORT || 8080);