var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var jsonfile = require('jsonfile');
//var csv = require('csv');

// SCRAPER SITE VARIABLES
var file = './data/data.json',
    url = 'http://san-francisco.eat24hours.com/curry-up-now/23091',
    domain = 'http://san-francisco.eat24hours.com';

// SCRAPER PAGE LEVEL VARIABLES
var container = 'table.item';
var elements = [
      {
        "type": "text",
        "name": "item",
        "el": "a.cpa",
      },
      {
        "type": "text",
        "name": "description",
        "el": ".item_desc",
      },
      {
        "type": "attr",
        "attr": "src",
        "name": "image",
        "el": ".item_img",
      },
      {
        "type": "text",
        "name": "price",
        "el": ".item_price span",
      }
    ];


request(url, function(error, response, body) {
  // declare vars
  var arr = [];
  // check for error
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);
  // load the page
  var $ = cheerio.load(body);

  // loop through each container element
  $(container).each(function( index ) {
    var obj = {},
        content = '';
    for (i = 0; i < elements.length; i++) {
      if (elements[i].type === 'text') {
        content = $(this).find(elements[i].el).text().trim();
      }
      if (elements[i].type === 'attr') {
        content = $(this).find(elements[i].el).attr(elements[i].attr);
      }
      //console.log(content);
      obj[elements[i].name] = content;
    };
    arr.push(obj);
  });

  jsonfile.writeFile(file, arr, function (err) {
    console.error(err)
  })

});
