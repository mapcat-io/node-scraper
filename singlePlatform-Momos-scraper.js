var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
//var csv = require('csv');
var jsonfile = require('jsonfile')

var file = './data/data.json'

var obj = [];
var url = 'http://places.singleplatform.com/momos/menu'
var domain = 'http://places.singleplatform.com'

request(url, function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  $('.item').each(function( index ) {
    var item = $(this).find('h4.title').text().trim();
    var description = $(this).find('.description.text').text().trim();
    console.log("Name: " + item + '; Description: ' + description );
    obj.push({
      "name": item,
      "description": description
    });
  });

  jsonfile.writeFile(file, obj, function (err) {
    console.error(err)
  })

});
