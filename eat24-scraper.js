var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var urls = [
  'http://san-francisco.eat24hours.com/curry-up-now/23091'
]

request("http://san-francisco.eat24hours.com/curry-up-now/23091", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  $('.item_name').each(function( index ) {
    var item = $(this).find('a.cpa').text().trim();
    var description = $(this).find('.item_desc').text().trim();
    console.log("Name: " + item + '; Description: ' + description );
    fs.appendFileSync('eat24-menu-items.txt', item + '; Description: ' + description + '\n');
  });

});
