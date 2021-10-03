const express = require("express");
require("dotenv").config();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const checkScope = require('express-jwt-authz'); // validate jwt scopes

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

app.get('/course',jwtCheck, checkScope(['read:courses']), function(req,res){
  res.json({courses: 
    [
      { id:1, name: 'math' },
      { id:2, name: 'english' }
    ]})
});


app.listen(3001)
console.info('app running on port' + process.env.REACT_APP_API_URL)
