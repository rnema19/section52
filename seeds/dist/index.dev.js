"use strict";

var mongoose = require('mongoose');

var _require = require('./seedHelpers'),
    places = _require.places,
    descriptors = _require.descriptors; // const Campground = require('./models/campground');


var Campground = require('../models/campground'); // const campground = require('../models/campground');


var cities = require('./cities');

mongoose.connect('mongodb://localhost:27017/yelp-camp').then(function () {
  console.log("Connection Successful!!!");
})["catch"](function (error) {
  console.log("Oh no error");
  console.log(error);
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected");
});

var sample = function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
};

var seedDB = function seedDB() {
  var i, random1000, price, camp;
  return regeneratorRuntime.async(function seedDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Campground.deleteMany({}));

        case 2:
          i = 0;

        case 3:
          if (!(i < 100)) {
            _context.next = 12;
            break;
          }

          random1000 = Math.floor(Math.random() * 1000);
          price = Math.floor(Math.random() * 20) + 10;
          camp = new Campground({
            author: '669fb441ee58c2cdc232f918',
            location: "".concat(cities[random1000].city, ", ").concat(cities[random1000].state),
            title: "".concat(sample(descriptors), " ").concat(sample(places)),
            image: "https://picsum.photos/200/300",
            description: "Image uploaded for better graphics!",
            price: price
          });
          _context.next = 9;
          return regeneratorRuntime.awrap(camp.save());

        case 9:
          i++;
          _context.next = 3;
          break;

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
}; // seedDB()


seedDB().then(function () {
  mongoose.connection.close();
});