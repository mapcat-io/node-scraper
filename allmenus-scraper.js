var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
//var csv = require('csv');
var jsonfile = require('jsonfile')

var file = './data/data.json'

var obj = [];
var url = 'http://www.allmenus.com/ca/san-francisco/63232-wan-kee-restaurant/menu/'
var domain = 'http://www.allmenus.com'

request(url, function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  $('.menu_item').each(function( index ) {
    var item = $(this).find('.name').text().trim();
    var description = $(this).find('.description').text().trim();
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
