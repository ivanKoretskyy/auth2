const express = require("express");
require("dotenv").config();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

const app = express();

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-7ymg9acq.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'http://localhost:3001',
    issuer: 'https://dev-7ymg9acq.us.auth0.com/',
    algorithms: ['RS256']
});

// app.use(jwtCheck); will make all calls private

app.get('/public', function(req,res){
  res.json({message: 'public api'})
});

app.get('/private',jwtCheck, function(req,res){
  res.json({message: 'private api'})
});


app.listen(3001)
console.info('app running on port' + process.env.REACT_APP_API_URL)
