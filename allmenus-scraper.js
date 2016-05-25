var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var urls = [
  'http://www.allmenus.com/ca/san-francisco/63228-taqueria-el-toro/menu/'
]

request("http://www.allmenus.com/ca/san-francisco/63228-taqueria-el-toro/menu/", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  $('.menu_item').each(function( index ) {
    var item = $(this).find('.name').text().trim();
    var description = $(this).find('.description').text().trim();
    console.log("Name: " + item + '; Description: ' + description );
    fs.appendFileSync('allmenus-toro-menu-items.txt', item + '; Description: ' + description + '\n');
  });

});
