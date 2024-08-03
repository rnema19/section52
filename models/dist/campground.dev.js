"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Review = require('./review'); // const { id } = require('../JoiSchemas');
// const { ref } = require('joi');


var CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
});
CampgroundSchema.post('findOneAndDelete', function _callee(doc) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!doc) {
            _context.next = 3;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(Review.deleteMany({
            _id: {
              $in: doc.reviews
            }
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}); // const campground = mongoose.model('Campground',CampgroundSchema)
// module.exports = campground

module.exports = mongoose.model('Campground', CampgroundSchema);