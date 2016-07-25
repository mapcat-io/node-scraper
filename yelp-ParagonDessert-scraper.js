var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
//var csv = require('csv');
var jsonfile = require('jsonfile')

var file = './data/data.json'

var obj = [];
var url = 'https://www.yelp.com/menu/paragon-san-francisco-2/dessert'
var domain = 'https://www.yelp.com'

request(url, function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  $('.media-block.menu-item').each(function( index ) {
    var item = $(this).find('h4').text().trim();
    var description = $(this).find('.menu-item-details-description').text().trim();
    var image = $(this).find('.photo-box-img').attr('src');
    console.log("Name: " + item + '; Description: ' + description );
    obj.push({
      "name": item,
      "description": description,
      "image": domain + image
    });
  });

  jsonfile.writeFile(file, obj, function (err) {
    console.error(err)
  })

});
