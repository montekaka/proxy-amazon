const request = require('request');
const proxyEndpoints = require('./libs/proxy-endpoints');
require('dotenv').config();

let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
let baseUrl = proxyEndpoints.reviews[env];

module.exports = (app) => {

  app.get('/api/reviews/:itemID/:page', (req, res) => {
  	const itemID = req.params.itemID;
    const page = req.params.page;
    const newUrl = baseUrl + `/api/items/${itemID}/${page}`;
    request(newUrl).pipe(res);
  });

  app.post('/api/reviews/:itemID', (req, res) => {
    const itemID = req.params.itemID;
    const newUrl = baseUrl + `/api/items/${itemID}`;
    req.pipe(request(newUrl)).pipe(res);
  });

  app.get('/api/reviews/:itemID/stats', (req, res) => {
    const itemID = req.params.itemID;
    const newUrl = baseUrl + `/api/items/${itemID}/stats`;
    request(newUrl).pipe(res);
  });
}