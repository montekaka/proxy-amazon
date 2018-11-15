const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();
app.use('/api/suggestions', bodyParser.json());
app.use('/api/suggestions', bodyParser.urlencoded({ extended: false }));

require('./proxy-suggestions')(app);
require('./proxy-reviews')(app);

app.use(express.static(path.join(__dirname, '/../client')));

app.listen(3000, () => console.log('Now listening on port 3000'));