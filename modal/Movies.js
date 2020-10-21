var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Movies = new Schema({
    _id: Number,
    name :{
        type: String,
        required: true
    },
    realeaseYear:{
        type: Number,
        required: true
    },

});
Movies.plugin(AutoIncrement, {inc_field: '_id'});
module.exports = mongoose.model('Movies', Movies);