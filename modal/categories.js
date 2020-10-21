var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Categories = new Schema({
    title: {
        type: String
    },
    movie: {
        idMovie:{
           type: String
        },
        srcImage: {
            type: String
        }
    }

});
module.exports = mongoose.model('Categorie', Categories);