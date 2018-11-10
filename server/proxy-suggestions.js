const request = require('request');
const proxyEndpoints = require('./libs/proxy-endpoints');
require('dotenv').config();

let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
let baseUrl = proxyEndpoints.suggestion[env];

module.exports = (app) => {

  app.get('/api/products/:id', (req, res) => {
  	const id = req.params.id;
    const newUrl = baseUrl+`/api/products/${id}`;
    request(newUrl).pipe(res);
  });

  app.get('/api/products', (req, res) => {
    const newUrl = baseUrl+'/api/products';
    request(newUrl).pipe(res);
  });

  app.get('/api/suggestions/products', (req, res) => {
    const params = req.query;
    const productId = params.productId; 
    const itemPerPage = params.itemPerPage;
    const currentPageNumber = params.currentPageNumber;   
    const newUrl = baseUrl+`/api/suggestions/products/${productId}?itemPerPage=${itemPerPage}&currentPageNumber=${currentPageNumber}`;
    request(newUrl).pipe(res);
  });
}