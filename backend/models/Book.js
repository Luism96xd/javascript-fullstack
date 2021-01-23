const {Schema, model} = require('mongoose');

//Esto es una tabla dentro de la base de datos

const BookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    isbn: {type: String, required: true},
    imagePath: {type: String, required: true},
    created_at: {type: Date, default: Date.now}
});


module.exports = model('Book', BookSchema);