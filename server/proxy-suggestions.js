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

  app.get('/api/suggestions/products/:id', (req, res) => {
    const params = req.query;
    const productId = req.params.id;
    const itemPerPage = params.itemPerPage;
    const currentPageNumber = params.currentPageNumber;   
    const newUrl = baseUrl+`/api/suggestions/products/${productId}?itemPerPage=${itemPerPage}&currentPageNumber=${currentPageNumber}`;
    request(newUrl).pipe(res);
  });

  app.post('/api/suggestions', (req, res) => {
    // expecting formData = {product1_id, product1_text, product2_id, product2_text}
    const formData = req.body;
    const newUrl = baseUrl+'/api/suggestions';
    request.post(newUrl).form(formData).pipe(res);
  });
}