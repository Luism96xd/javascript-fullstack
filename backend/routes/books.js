const {Router} = require('express');
//Define las rutas de mi servidor, que peuden ser muchas
const router = Router();

const Book = require('../models/Book');
const { unlink } = require('fs-extra');
const path = require('path');

//LISTAR
router.get('/', async (request, response) => {
    const books = await Book.find();
    response.json(books);
});
//AÑADIR
router.post('/', async(request, response) => {
    const {title, author, isbn} = request.body;
    const imagePath = "/uploads/" + request.file.filename;
    const newBook = new Book({title, author, isbn, imagePath});
    await newBook.save();
    console.log(newBook);
    response.json({message:'Book Saved'});
});
//BORRAR
router.delete('/:id', async (request, response) =>{
    console.log(request.params.id);
    const book = await Book.findByIdAndDelete(request.params.id);
    console.log(book);
    unlink(path.resolve("./backend/public" + book.imagePath))
    response.json({message: 'Book Deleted'});
});

module.exports = router;
//API REST, son rutas del servidor que son diseñadas para enviar y recibir JSON entre
//servidores, solo datos