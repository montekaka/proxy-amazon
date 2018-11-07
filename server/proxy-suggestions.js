const request = require('request');
const proxyEndpoints = require('./libs/proxy-endpoints');

let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
let baseUrl = proxyEndpoints.suggestion[env];

module.exports = (app) => {
  app.get('/api/products', (req, res) => {
    const newUrl = baseUrl+'/api/products';
    request(newUrl).pipe(res);
  })

  app.get('/api/suggestions/products/:productId', (req, res) => {
    const productId = req.params.productId;
    const newUrl = baseUrl+`/api/suggestions/products/${productId}`;
    request(newUrl).pipe(res);
  })
}