var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
//var csv = require('csv');
var jsonfile = require('jsonfile')

var file = './data/data.json'

var obj = [];
var url = 'https://postmates.com/sf/trader-joes-san-francisco'
var domain = 'https://postmates.com'

request(url, function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  $('.products li').each(function( index ) {
    var item = $(this).find('.name').text().trim();
    console.log("Name: " + item );
    obj.push({
      "name": item,
    });
  });

  jsonfile.writeFile(file, obj, function (err) {
    console.error(err)
  })

});
