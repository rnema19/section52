const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Review = require('./review');
// const { id } = require('../JoiSchemas');
// const { ref } = require('joi');


const CampgroundSchema = new Schema({
    title : String,
    image : String,
    price : Number,
    description : String,
    location : String,
    author : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Review'
        }
    ]
})

CampgroundSchema.post('findOneAndDelete',async function (doc) {
    if (doc) {
        await Review.deleteMany({
        _id: {
            $in : doc.reviews
        }
    })
    }
})

// const campground = mongoose.model('Campground',CampgroundSchema)
// module.exports = campground
module.exports = mongoose.model('Campground',CampgroundSchema)