// const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const passportlocalmongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type : String,
        required : true,
        unique : true
    }
})

UserSchema.plugin(passportlocalmongoose)

module.exports = mongoose.model('User',UserSchema)