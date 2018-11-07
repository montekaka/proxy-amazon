const express = require('express');
const path = require('path');

const app = express();

require('./proxy-suggestions')(app)
app.use(express.static(path.join(__dirname, '/../client')));

app.listen(3000, () => console.log('Now listening on port 3000'));