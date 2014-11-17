/*jshint node: true*/
'use strict';
var express = require('express');
var app = express();
var request = require('superagent');

app.use(express.static( 'public', { maxAge: 86400000 })); //one day cache

app.get('/', function(req, res) {
    res.sendFile('/index.html');
});

app.get('/at/:coord', function(req, res) {
    var findCityUrl = 'http://api.wunderground.com/api/' +
    process.env.WUNDERAPI +
    '/geolookup/q/' +
    req.params.coord +
    '.json';
    var city;
    var state;
	request.get(findCityUrl).end(function(err, locationData) {
      city = locationData.body.location.city;
      state = locationData.body.location.state;
      
      var wunderUrl = 'http://api.wunderground.com/api/' +
      process.env.WUNDERAPI +
      '/conditions/q/' +
      state + '/' +
      city +
      '.json';

      request.get(wunderUrl).end(function(err, wunderData) {
          var parsedData = JSON.parse(wunderData.text);
          res.json({temp: parsedData.current_observation.temp_f});
      });
    });
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log('server running on ' + app.get('port'));
});
