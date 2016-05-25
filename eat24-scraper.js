var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
//var csv = require('csv');
var jsonfile = require('jsonfile')

var file = './data/data.json'

var obj = [];
var url = 'http://san-francisco.eat24hours.com/curry-up-now/23091'
var domain = 'http://san-francisco.eat24hours.com'

request(url, function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  $('table.item').each(function( index ) {
    var item = $(this).find('a.cpa').text().trim();
    var description = $(this).find('.item_desc').text().trim();
    var image = $(this).find('.item_img').attr('src');
    //console.log("Name: " + item + '; Description: ' + description );
    obj.push({
      "name": item,
      "description": description,
      "image": domain + image
    });
    fs.appendFileSync('result.txt', item + '; Description: ' + description + '\n');
  });

  jsonfile.writeFile(file, obj, function (err) {
    console.error(err)
  })

});
