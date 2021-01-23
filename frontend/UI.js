//clase para manipular el DOM
import BookService from './services/BookService';
const bookService = new BookService();

import {format} from 'timeago.js';

//Mostrar libros al inicio
document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    ui.renderBooks();
});

class UI{
    async renderBooks(){
        const books = await bookService.getBooks();
        console.log(books);
        const booksContainer = document.getElementById('books-cards');
        booksContainer.innerHTML = "";
        books.forEach(book => {
            const div = document.createElement('div');
            div.className = "";
            div.innerHTML+= `
            <div class="card m-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${book.imagePath}" alt="${book.title}" class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <div class="card-block px-2">
                                <h4 class="card-title">${book.title}</h4>
                                <p class="card-text">${book.author}</p>
                                <p class="card-text">ISBN: ${book.isbn}</p>
                                <a href="#" class="btn btn-danger delete" _id="${book._id}">X</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <small>${format(book.created_at)}</small>
                    </div>
                </div>
            </div>`;
            booksContainer.appendChild(div);
        });
    }
    async addNewBook(book){
        await bookService.postBook(book);
        this.clearBookForm();
        this.renderBooks();
    }
    clearBookForm(){
        const formulario = document.getElementById('book-form');
        formulario.reset();
    }
    renderMessage(message, colorMessage, secondsToRemove){
        const div = document.createElement('div');
        div.className = `alert alert-${colorMessage} message`;
        div.appendChild(document.createTextNode(message));
        const container = document.getElementById('message');
        const bookForm = document.querySelector('#book-form');
        container.appendChild(div);
        setTimeout( () => {
            document.querySelector(".message").remove();
        }, secondsToRemove)
        //container.insertBefore(div,bookForm);

    }
    async deleteBook(bookId){
        const book = await bookService.deleteBook(bookId);
        this.renderBooks();
        console.log(bookId, "Eliminado");
    }
}


export default UI;